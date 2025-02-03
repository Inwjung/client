import { User } from "../_models/user"
import { parseUserPhoto } from "./helper"
import { Paginator, UserQueryPagination } from "./Pagination"



type cacheOpt = 'member' | 'chat' | 'follower' | 'following'
type cacheValue = Paginator<UserQueryPagination, User>

const data = new Map()
export const cacheManager = { // ใช้ const ***


    createKey: function <T extends { [key: string]: any }>(query: T) {
        return Object.values(query).join('🤏🏻')
    },

    load: function (key: string, opt: cacheOpt): cacheValue | undefined {
        return data.get(opt + key)

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
