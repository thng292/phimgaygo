import { useQuery } from "react-query";
import config, { oneTimeGet } from "../../Datasource/Config";
import KeywordSearch from "../../model/Movie/KeywordSearch";
import DatasourceInstance from "../../Datasource/DatasourceInstance";

export default function getKeywordSearch(query: string, page: number = 1) {
    return useQuery(['KeywordSearch', query, page], () =>
        DatasourceInstance.get(`/search/keyword?api_key=${config.key}&query=${query}&page=${page}`)
            .then(value => value.data as KeywordSearch),
        {...oneTimeGet, enabled: Boolean(query)}
    )
}