import React from "react";
import groq from "groq";
import { useRouter } from "next/dist/client/router";

// import config
import { getClient } from "../../lib/sanity.server";
import TripImages from "../../components/Trip/TripImages";

const Trip = ({ trip }) => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;
    return (
        <div className="mx-auto flex w-full max-w-[1300px] flex-col pt-[70px] md:pt-[100px]">
            <TripImages trip={trip} />
            <div className="">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
                itaque tenetur modi debitis praesentium ex quo deserunt ullam
                obcaecati odit! Deserunt est, distinctio voluptas unde corporis
                numquam aspernatur? Officia, explicabo omnis. Nostrum
                necessitatibus aspernatur libero sit exercitationem! Itaque
                porro distinctio quos ut incidunt nulla nam. Atque repudiandae
                rem cum quasi, aperiam fuga quaerat eum, blanditiis dicta
                impedit quo porro quod enim alias unde laboriosam, illo
                voluptates quas! Esse ipsa repudiandae rem adipisci enim impedit
                eos perspiciatis voluptates exercitationem quas magnam, officia
                corrupti veritatis libero aliquid doloremque autem, sit a
                quisquam dolores, quibusdam ratione! At dignissimos id fuga
                obcaecati eum magni ipsa hic assumenda debitis animi perferendis
                voluptate commodi libero recusandae nulla natus autem, dolores
                ipsum repudiandae aliquid doloremque minus similique
                necessitatibus? Voluptatem consequatur qui doloremque aut eum
                assumenda incidunt quo exercitationem natus corporis porro quas
                dolorem corrupti quibusdam adipisci eos aliquid excepturi, illum
                eveniet omnis iure asperiores distinctio aspernatur quis.
                Doloremque praesentium facere repudiandae illo provident fuga
                adipisci at ullam, cupiditate laboriosam inventore consectetur.
                Dolore facilis nulla ut cum architecto quisquam nesciunt, porro
                eveniet vero odit magnam in? Odio est quidem placeat minus animi
                beatae vero eveniet ullam suscipit, fugit sit. Doloribus
                dignissimos ipsa aliquam fugiat suscipit soluta ut iure
                repudiandae quaerat quisquam dicta ex et quam deleniti voluptate
                cupiditate voluptatibus a provident magni, aspernatur autem
                nobis non. Veniam deleniti, explicabo optio exercitationem fugit
                minima quia, dolores corporis, accusamus placeat dolorem nisi
                molestiae aliquid velit. Officiis possimus animi nam adipisci
                unde accusamus cum eius. Praesentium laudantium quasi, quisquam
                dolore modi nostrum facere minus, molestias explicabo veniam
                beatae, vero expedita nihil ab odio porro. Voluptatem
                reprehenderit dicta laborum nulla qui iusto ad minima.
                Repellendus molestias consequuntur, saepe esse corporis mollitia
                itaque reprehenderit quod nostrum blanditiis veniam iure, eius
                eveniet ab pariatur commodi expedita explicabo, maxime
                laudantium? Sint dolores inventore facere! Nemo, eum harum! Eius
                fugiat culpa voluptas suscipit maxime dolores delectus sit
                mollitia commodi! Iure excepturi eaque ex quod, debitis, ea
                perferendis quasi facere quisquam molestiae cum, nam enim magni!
                At, incidunt dolore possimus voluptates libero labore vel magnam
                optio vitae cum nihil, veniam harum aut, corporis ab asperiores
                placeat animi! Sequi pariatur ipsam repellendus eius quibusdam
                at iusto expedita maxime dolorum aut quis accusamus
                reprehenderit temporibus eveniet ad eum vel, dolor beatae sint
                error quaerat aspernatur. Ullam quaerat tempore molestiae harum
                quisquam dolorem quis minima quidem! Neque, nisi voluptatum.
                Deleniti earum aut non facere minima. Consectetur laboriosam
                accusamus modi eum aperiam quidem possimus provident quasi.
                Dolor alias totam ea consequuntur quisquam, impedit sint
                recusandae numquam culpa voluptatum exercitationem quis labore
                atque quam corrupti fuga minus dolore id aliquam vel eos nemo
                quasi repellendus debitis! Natus iusto neque doloremque quod,
                modi minus molestias vitae impedit cum delectus esse ratione ea
                est nihil eos facere eius perspiciatis ab dolorum quam pariatur
                eum id sed hic! Ipsam aperiam nihil placeat doloremque
                voluptatum expedita praesentium sunt, laboriosam assumenda saepe
                blanditiis nemo atque nulla nisi labore magnam reiciendis
                tempora ducimus maiores. Distinctio eveniet modi sapiente
                repellendus quo sit suscipit sunt totam ipsam nobis, dicta odio!
            </div>
        </div>
    );
};

const tripPathQuery = groq`
    *[(_type == "trip")].slug.current
`;

export async function getStaticPaths() {
    const path = await getClient().fetch(tripPathQuery);
    return {
        paths: path.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

const tripQuery = groq`
*[(_type == "trip") && slug.current == $slug][0]`;

export async function getStaticProps({ params, preview = false }) {
    const trip = await getClient(preview).fetch(tripQuery, {
        slug: params.slug,
    });
    return {
        props: {
            trip,
        },
    };
}

export default Trip;
