import {
    createPreviewSubscriptionHook,
    createCurrentUserHook,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";

const ImageBuilder = createImageUrlBuilder(config)

export const urlFor = (source) => ImageBuilder.image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const useCurrentUser = createCurrentUserHook(config);
