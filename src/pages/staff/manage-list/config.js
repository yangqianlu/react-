//计算最后一个单词的长度
export const lastOfWordLength = (s) => {
  //去除多余空格
  const result = [...new Set(s.split(' '))];
  //防止'a '这种情况
  if (result.length >= 2 && result[result.length - 1] === '') {
    return result[result.length - 2].length
  }
  return result[result.length - 1].length
}

//两个数和=target 返回对应的下标 不能利用数组中同一个元素
//解法一
// export const twoNum=(arr,target)=>{
//   for(let i=0;i<arr.length;i++){
//     for(let j=i+1;j<arr.length;j++){
//       if(target===arr[j]+arr[i]){
//         console.log([i,j])
//          return [i,j]
//       }
//     }
//   }
// }
//解法二

export  const twoNum =(arr,target)=>{
let map=new Map();
for(let i =0;i<arr.length;i++){
  if(map.has(arr[i])){
    return [map.get(arr[i]),i]
  }
    map.set(target-arr[i],i)
  
}

}



