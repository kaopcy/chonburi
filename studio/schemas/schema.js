import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import post from "./post";
import blockContent from "./blockContent";
import category from "./category";
import author from "./author";
import province from "./province";
import restaurant from "./restaurant";
import tag from "./tag";

export default createSchema({
    name: "default",
    types: schemaTypes.concat([
        post,
        blockContent,
        category,
        author,
        province,
        restaurant,
        tag
    ]),
});
