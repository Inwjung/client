import { User } from "../_models/user"
import { parseUserPhoto } from "./helper"
import { Paginator, QueryPagination, UserQueryPagination } from "./Pagination"



type cacheOpt = 'member' | 'chat' | 'follower' | 'following'
type cacheValue = Paginator<UserQueryPagination, User> | Paginator<QueryPagination, User>

const data = new Map()
export const cacheManager = { // ใช้ const ***


    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('🤏🏻')
    },

    load: function (key: string, opt: cacheOpt): cacheValue | undefined {

        const _data = data.get(opt + key)
        if (opt == 'chat')
            return _data as Paginator<UserQueryPagination, User>

        return _data as Paginator<QueryPagination, User>
        return undefined
    },

    save: function (key: string, opt: cacheOpt, value: cacheValue) {

        // if (opt === "chat")
        value.items = value.items.map(u => parseUserPhoto(u))
        data.set(opt + key, value)
    },


    clear: function (opt: cacheOpt | 'all') {
        if (opt === 'all') {
            data.clear()
        } else {
            for (const keKing of data.keys()) {
                if (keKing.startsWith(opt))
                    data.delete(keKing)
            }
        }
    },
}
