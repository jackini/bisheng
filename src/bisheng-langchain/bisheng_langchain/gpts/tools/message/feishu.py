from typing import Any, Optional, Type

import requests
from langchain_core.pydantic_v1 import BaseModel, Field, root_validator
from loguru import logger

from bisheng_langchain.gpts.tools.api_tools.base import (APIToolBase,
                                                         MultArgsSchemaTool)


class InputArgs(BaseModel):
    message: Optional[str] = Field(description="需要发送的钉钉消息")
    receive_id: Optional[str] = Field(description="接收的ID")
    receive_id_type: Optional[str] = Field(description="接收的ID类型")
    container_id: Optional[str] = Field(description="container_id")
    start_time: Optional[str] = Field(description="start_time")
    end_time: Optional[str] = Field(description="end_time")
    page_token: Optional[str] = Field(description="page_token")
    container_id_type: Optional[str] = Field(description="container_id_type")


class FeishuMessageTool(BaseModel):
    API_BASE_URL = "https://open.feishu.cn/open-apis"
    app_id: str = Field(description="app_id")
    app_secret: str = Field(description="app_secret")

    def send_message(self, message: str, receive_id: str, receive_id_type: str) -> str:
        """
        发送钉钉机器人消息

        Args:
            webhook_url: 钉钉机器人的 webhook 地址
            message: 要发送的消息内容

        Returns:
            dict: 钉钉接口的响应结果
        """
        # 构建请求头
        headers = {"Content-Type": "application/json","Authorization":f"Bearer {self.get_access_token()}"}
        # 构建请求体
        url = f"{self.API_BASE_URL}/im/v1/messages?receive_id_type={receive_id_type}"
        payload = {
            "receive_id": receive_id,
            "msg_type": "text",
            "content": '{\"text\":\"' + message + '\"}',
            # "content": message.strip('"').replace(r"\"", '"').replace(r"\\", "\\"),
        }
        try:
            # 发送 POST 请求
            response = requests.post(url=url, headers=headers, json=payload)

            # 检查响应状态
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            print(f"发送消息失败: {str(e)}")

        return ""

    def get_chat_messages(
        self,
        container_id: str,
        container_id_type: str,
        start_time: str,
        end_time: str,
        page_token: str,
        sort_type: str = "ByCreateTimeAsc",
        page_size: int = 20,
    ) -> str:
        """获取聊天记录"""
        url = f"{self.API_BASE_URL}/im/v1/messages"
        headers = {"Content-Type": "application/json","Authorization":f"Bearer {self.get_access_token()}"}
        response = requests.get(
            url=url,
            headers=headers,
            params={
                "container_id": container_id,
                "container_id_type": container_id_type,
                "start_time": start_time,
                "end_time": end_time,
                "sort_type": sort_type,
                "page_token": page_token,
                "page_size": page_size,
            }
        )

        return response.json()

    def get_access_token(self) -> str:
        url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
        params = {"app_id":self.app_id , "app_secret": self.app_secret}
        response = requests.post(url,json=params)
        return response.json()["tenant_access_token"]


    @classmethod
    def get_api_tool(cls, name: str, **kwargs: Any) -> "FeishuMessageTool":
        attr_name = name.split("_", 1)[-1]
        c = FeishuMessageTool(**kwargs)
        class_method = getattr(c, attr_name)

        return MultArgsSchemaTool(
            name=name,
            description=class_method.__doc__,
            func=class_method,
            args_schema=InputArgs,
        )
