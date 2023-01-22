import axios from "axios";
import { useQuery } from "react-query";
import config, { oneTimeGet } from "../../Datasource/Config";
import KeyWord from "../../model/Movie/KeyWord";
import DatasourceInstance from "../../Datasource/DatasourceInstance";

export default function getKeywordDetail(keyword_id: number) {
    return useQuery(['keyword', keyword_id], () => 
        DatasourceInstance.get(`/keyword/${keyword_id}?api_key=${config.key}`)
        .then(value => value.data as KeyWord)
    , oneTimeGet)
}