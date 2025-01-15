
const defaultAvatar = '/assets/'

function getAvatar(user: User): string {
    if (user.photo) {
        const avatar = user.photo.find(p => p.is_avatar === true)
        if (avatar)
            return avatar.url
    }
    return defaultAvatar
}
function getPhotoOfTheDay(user: User): string {
    return defaultAvatar
}