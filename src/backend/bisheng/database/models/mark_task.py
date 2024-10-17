
from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional, Tuple, Union
from uuid import UUID, uuid4

from bisheng.database.base import session_getter
from bisheng.database.models.base import SQLModelSerializable
from bisheng.database.models.mark_app_user import MarkAppUserBase
from bisheng.database.models.role_access import AccessType, RoleAccess, RoleAccessDao
from bisheng.database.models.user_role import UserRoleDao
# if TYPE_CHECKING:
from pydantic import validator
from sqlalchemy import Column, DateTime, String, and_, func, or_, text
from sqlmodel import JSON, Field, select, update


class MarkTaskStatus(Enum):
    DEFAULT = 1
    DONE = 2
    ING = 3


class MarkTaskBase(SQLModelSerializable):
    create_user: str = Field(index=True)
    create_id: int = Field(index=True)
    app_id: str = Field(index=True)
    process_users: str = Field(index=False) #23,2323
    mark_user: str = Field(index=True,nullable=True) 
    status: Optional[int] = Field(index=False, default=1)
    update_time: Optional[datetime] = Field(
        sa_column=Column(DateTime,
                         nullable=True,
                         server_default=text('CURRENT_TIMESTAMP'),
                         onupdate=text('CURRENT_TIMESTAMP')))
    create_time: Optional[datetime] = Field(default=(datetime.now()).strftime('%Y-%m-%d %H:%M:%S'),
                                            index=True)


class MarkTask(MarkTaskBase,table=True):
    id: Optional[int] = Field(default=None, primary_key=True)



class MarkTaskDao(MarkTaskBase):

    @classmethod
    def create_task(cls, task_info: MarkTask) -> MarkTask:
        with session_getter() as session:
            session.add(task_info)
            session.commit()
            session.refresh(task_info)
            return task_info 

    @classmethod
    def delete_task(cls, task_info: MarkTask) -> MarkTask:
        with session_getter() as session:
            session.delete(task_info)
            session.commit()
            return task_info

    @classmethod
    def get_task_byid(cls,task_id:int) -> MarkTask:
        with session_getter() as session:
            statement = select(MarkTask).where(MarkTask.id==task_id)
            return session.exec(statement).first()


    @classmethod
    def get_task_list(cls, user_id: int,
                      page_size: int = 10,
                      page_num: int = 1,
                      ) -> List[MarkTask]:
        with session_getter() as session:
            statement = select(MarkTask).where(MarkTask.status==MarkTaskStatus.DEFAULT.value)
            if user_id:
                statement = statement.where(or_(MarkTask.user_id == user_id))
            statement = statement.limit(page_size).offset((page_num - 1) * page_size)
            return session.exec(statement).all()
