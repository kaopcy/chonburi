const temp = [
    { type: "เมือง", value: "123a" },
    { type: "ศรีราชา", value: "123v" },
    { type: "เมือง", value: "123a" },
    { type: "พระโขนง", value: "123d" },
    { type: "เมือง", value: "123c" },
    { type: "ศรีราชา", value: "123v" },
    { type: "ศรีราชา", value: "123d" },
    { type: "เมือง", value: "123c" },
    { type: "พระโขนง", value: "123d" },
    { type: "พระโขนง", value: "123d" },
    { type: "เมือง", value: "123c" },
];

// const result = temp.reduce((prev, cur) => {
//     cur.type
//     const arr = { [cur.type]: [...prev[cur.type] , cur.value ] , ...prev   }
//     return  arr;
// }, 0);

const result = temp.reduce((prev, cur) => {
    if (prev[cur.type]) {
        return { ...prev, [cur.type]: [...prev[cur.type], { ...cur }] };
    }
    return { ...prev, [cur.type]: [{ ...cur }] };
}, {});
console.log(result['เมือง']);
