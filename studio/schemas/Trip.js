const activity = {
    name: "activity",
    title: "กิจกรรม",
    type: "document",
    fields: [
        {
            name: "name",
            title: "ชื่อกิจกรรม",
            type: "string",
        },
        {
            name: "time",
            title: "เวลาเริ่มต้นของกิจกรรม",
            type: "string",
        },
        {
            name: "detail",
            title: "รายละเอียดของกิจกรรม",
            type: "string",
        },
        {
            name: "link",
            title: "ลิ้งค์",
            type: "string",
        },
        {
            name: "lat",
            title: "ละติจูด",
            type: "number",
        },
        {
            name: "lng",
            title: "ลองจิจูด",
            type: "number",
        },
    ],
};

const image = {
    name: "eachImage",
    type: "object",
    title: "รูปภาพประกอบ",
    fields: [
        {
            name: "name",
            title: "ชื่อรูป",
            type: "string",
        },
        {
            name: "url",
            type: "string",
            title: "url",
        },
        {
            name: "source",
            type: "string",
            title: "source",
        },
    ],
};

export default {
    name: "trip",
    title: "Trip",
    type: "document",
    fields: [
        {
            name: "title",
            title: "ชื่อทริป",
            type: "string",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            validation: (rule) => rule.required(),
            options: {
                source: "title",
                maxLength: 96,
                slugify: (input) => input.replace(/\s+/g, "-").slice(0, 200),
            },
        },
        {
            name: "images",
            title: "รูปทั้งหมด",
            type: "array",
            of: [image],
        },
        {
            name: "days",
            title: "วัน",
            type: "array",
            of: [
                {
                    name: "day",
                    title: "แต่ละวัน",
                    type: "document",
                    fields: [
                        {
                            name: "activities",
                            title: "กิจกรรมทั้งหมด",
                            type: "array",
                            of: [activity],
                        },
                    ],
                },
            ],
        },
    ],
};
