export default function AddSpaceToNumber(n: number) {
    let tmp = String(n)
    let head = tmp.length % 3
    let ans = ''
    for (let i = 0; i < tmp.length; ++i) {
        if (i % 3 - head===0) {
            ans+=' '
        }
        ans+=(tmp[i])
    }
    return ans.trim()
}