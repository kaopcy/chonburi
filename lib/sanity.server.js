import { createClient } from "next-sanity";
import { config } from "./config";

export const sanityClient = createClient(config);

export const previewClient = createClient({
    ...config,
    useCdn: false,
    token: "sk1AK3wrW5nbWLqdCFHgt6Mv4YXmCRVeXgx3Py4Ja9W3H4J5Zvme9j0TS3urw1V0XHBLdnjBHKvM8JoD0j7nDR9hOiwftKnnxOgzd9wuJ4XJ9aHkAzqqsgsL7WHwWiQZGZ4NOo5UTVz0Qvf240yBqzVcPGGGzZZbYMrPpji36vOWG72jrfJq",
});

export const getClient = (usePreview) =>
    usePreview ? previewClient : sanityClient;
