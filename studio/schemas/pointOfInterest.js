const getPosition = async () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
};

export default {
    name: "pointOfInterest",
    type: "document",
    title: "PointOfInterest",
    initialValue: async () => ({
        publishedAt: new Date().toISOString(),
    }),

    fields: [
        {
            name: "title",
            type: "string",
            title: "ชื่อสถานที่",
            validation: (rule) => rule.required(),
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
            name: "coords",
            type: "object",
            title: "ตำแหน่งพิกัด",
            validation: (rule) => rule.required(),
            fields: [
                {
                    title: "ละติจูด",
                    name: "lat",
                    type: "string",
                    validation: (rule) => rule.required(),
                },
                {
                    title: "ลองจิจูด",
                    name: "lng",
                    type: "string",
                    validation: (rule) => rule.required(),
                },
            ],
        },
       
        {
            name: "amphoe",
            title: "อำเภอ",
            type: "reference",
            validation: (rule) => rule.required(),
            to: {
                type: "amphoe",
            },
        },
        {
            name: "tambon",
            title: "ตำบล",
            type: "reference",
            validation: (rule) => rule.required(),
            to: {
                type: "tambon",
            },
        },
        {
            name: "placeID",
            title: "placeID",
            type: "string",
            validation: (rule) => rule.required(),
        },
        {
            name: "mainImage",
            type: "array",
            title: "รูปภาพประกอบ-IMAGE",
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
            name: "imageURL",
            type: "array",
            title: "รูปภาพประกอบ-URL",
            of: [
                {
                    name: "eachImage",
                    type: "object",
                    title: "รูปภาพประกอบ",
                    fields: [
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
                    ]
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
