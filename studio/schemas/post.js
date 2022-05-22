const getPosition = async () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
};

const getPostedAt = async () => {
    try {
        const { coords } = await getPosition();
        const { latitude, longitude, altitude } = coords;
        return {
            _type: "geopoint",
            lat: latitude,
            lng: longitude,
            alt: altitude || undefined,
        };
    } catch (error) {
        return undefined;
    }
};

export default {
    name: "post",
    type: "document",
    title: "Blog post",
    initialValue: async () => ({
        postedAt: await getPostedAt(),
        publishedAt: new Date().toISOString(),
    }),

    fields: [
        {
            title: "ประเภทของแหล่งท่องเที่ยว",
            name: "locationType",
            type: "string",
            options: {
                list: [
                    { title: "ประวัติศาสตร์", value: "ประวัติศาสตร์#FF85B3" },
                    { title: "ธรรมชาติ", value: "ธรรมชาติ#6BCB77" },
                    { title: "วัฒนธรรม", value: "วัฒนธรรม#FFD93D" },
                    { title: "เชิงนิเวศ", value: "เชิงนิเวศ#4D96FF" },
                ],
            },
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
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "author",
            type: "reference",
            title: "Author",
            to: {
                type: "author",
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
