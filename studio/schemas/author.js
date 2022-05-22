export default {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
        
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "username",
            title: "Username",
            type: "string",
        },
        {
            name: "avatar",
            title: "Avatar",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "username",
                maxlength: 96,
            },
        },
        {
            name: "bio",
            title: "Bio",
            type: "text",
        },
    ],
    preview: {
        select: {
            title: "username",
            media: 'avatar'
        }
    }
};
