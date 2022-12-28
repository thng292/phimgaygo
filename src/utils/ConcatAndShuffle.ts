export default function ConcatAndShuffle(arr1: any[], arr2: any[]) {
    return arr1.concat(arr2).sort((a: any, b: any) => Math.random() * 10 - 5)
}