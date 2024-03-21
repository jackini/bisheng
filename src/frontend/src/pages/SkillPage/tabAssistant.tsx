import { useTranslation } from "react-i18next";
import { bsconfirm } from "../../alerts/confirm";
import { SearchInput } from "../../components/bs-ui/input";
import AutoPagination from "../../components/bs-ui/pagination/autoPagination";
import CardComponent from "../../components/cardComponent";
import { readFlowsFromDatabase } from "../../controllers/API/flow";
import { FlowType } from "../../types/flow";
import { useTable } from "../../util/hook";

export default function Assistants() {
    const { t } = useTranslation()

    const { page, pageSize, data: dataSource, total, loading, setPage, search } = useTable<FlowType>({ pageSize: 11 }, (param) =>
        readFlowsFromDatabase(param.page, param.pageSize, param.keyword)
    )

    const handleCheckedChange = (checked, data) => {
        console.log('object :>> ', checked, data);
        return Promise.resolve()
    }

    const handleDelete = (data) => {
        console.log('data :>> ', data);
        bsconfirm({
            desc: '确认删除该助手？',
            okTxt: t('delete'),
            onOk(next) {
                next()
            }
        })
    }

    const handleSetting = (data) => {
        console.log('data :>> ', data);
    }

    return <div className="h-full relative">
        <div className="px-10 py-10 h-full overflow-y-scroll scrollbar-hide">
            <div className="flex">
                <SearchInput className="w-64" placeholder="搜索您需要的助手" onChange={(e) => search(e.target.value)}></SearchInput>
            </div>
            {/* list */}
            {
                loading
                    ? <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-10 bg-[rgba(255,255,255,0.6)] dark:bg-blur-shared">
                        <span className="loading loading-infinity loading-lg"></span>
                    </div>
                    : <div className="mt-6 flex gap-2 flex-wrap pb-20 min-w-[980px]">
                        <CardComponent<FlowType>
                            data={null}
                            type='skill'
                            title="新建技能"
                            description={(<>
                                <p>没有想法？</p>
                                <p>我们提供场景模板供您使用和参考</p>
                            </>)}
                            onClick={() => console.log('新建')}
                        ></CardComponent>
                        {
                            dataSource.map((item, i) => (
                                <CardComponent<FlowType>
                                    data={item}
                                    id={item.id}
                                    type='skill'
                                    title={item.name}
                                    description={item.description}
                                    checked={item.status === 2}
                                    edit={item.write}
                                    user={item.user_name}
                                    onCheckedChange={handleCheckedChange}
                                    onDelete={handleDelete}
                                    onSetting={handleSetting}
                                ></CardComponent>
                            ))
                        }
                    </div>
            }
        </div>
        {/* footer */}
        <div className="flex justify-between absolute bottom-0 left-0 w-full bg-[#F4F5F8] h-16 items-center px-10">
            <p className="text-sm text-muted-foreground break-keep">助手是可以调用一个或者多个技能的智能体</p>
            <AutoPagination className="m-0 w-auto justify-end" page={page} pageSize={pageSize} total={total} onChange={setPage}></AutoPagination>
        </div>
    </div>
};
