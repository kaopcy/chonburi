export default {
    title: "ร้านอาหาร",
    name: "restaurant",
    type: "document",
    fields: [
        {
            name: "title",
            type: "string",
            title: "ชื่อร้าน",
        },
        {
            title: "ประเภทของร้าน",
            name: "locationType",
            type: "string",
            options: {
                list: [
                    { title: "ร้านอาหาร", value: "ร้านอาหาร#293D7D" },
                    { title: "คาเฟ่", value: "คาเฟ่#FF4848" },
                    { title: "บาร์", value: "บาร์#006317" },
                    { title: "ร้านกาแฟ", value: "ร้านกาแฟ#9D5C0D" },
                ],
            },
        },
        {
            name: "tag",
            title: "แท็ก",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: {
                        type: "tag",
                    },
                },
            ],
        },
        {
            name: "coords",
            type: "geopoint",
            title: "ตำแหน่งพิกัด",
        },
        {
            name: "location",
            type: "string",
            title: "สถานที่ตั้ง",
        },

        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title",
                maxLength: 96,
                slugify: (input) =>
                    input.replace(/\s+/g, "-").slice(0, 200),
            },
        },
        {
            name: "mainImage",
            type: "array",
            title: "รูปภาพประกอบ",
            of: [
                {
                    name: "eachImage",
                    type: "image",
                    title: "รูปภาพประกอบ",
                    options: {
                        hotspot: true,
                    },
                },
            ],
        },
        {
            name: "publishedAt",
            type: "datetime",
            title: "Published At",
        },
        {
            name: "body",
            type: "blockContent",
            title: "Body",
        },
    ],
};
