import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// import images
import palotImage from "../../public/images/เมืองพระรถ.jpg";
import sripaloImage from "../../public/images/เมืองศรีพโล.jpg";
import payareImage from "../../public/images/เมืองพญาเร่.jpg";

import AmphoeHistory from "../../components/Home/AmphoeHistory";

const History = () => {
    return (
        <div className="relative mx-auto flex h-[3000px] w-full max-w-[1300px] flex-col px-4 text-text sm:px-10">
            <div className="h-[70px] w-full shrink-0 md:h-[100px]"></div>
            {/* <div className="relative h-screen w-full ">
                <Image
                    layout="fill"
                    objectFit="cover"
                    alt="สะพานอัษฏางค์"
                    quality="100"
                    blurDataURL="blurredUrl"
                    placeholder="blur"
                    src="https://lh3.ggpht.com/p/AF1QipNaBh_oBBALhCZG6_eL3pNKaLYVK6ChUNogr4XF=s5000"
                    className=""
                />
            </div> */}
            <div className="mt-10 flex flex-col  md:flex-row ">
                <div className="mb-10 flex w-full flex-col justify-center tracking-wide md:mb-0 md:pr-16">
                    <div className="mb-4 text-xl font-medium text-text-lighterr">
                        ชลบุรี
                    </div>
                    <div className="mb-7 text-3xl font-extrabold">
                        ประวัติจังหวัดชลบุรี
                    </div>
                    <div className="mb-7 leading-7">
                        จังหวัดชลบุรี
                        เป็นดินแดนที่ปรากฏขึ้นมาในหน้าประวัติศาสตร์ตั้งแต่สมัยทวารวดี
                        ขอม และสุโขทัย แต่เดิมเป็นเพียงเมืองเกษตรกรรม
                        และชุมชนประมงเล็กๆ หลายเมือง กระจัดกระจายกันอยู่ห่างๆ
                        โดยในทำเนียบศักดินาหัวเมืองสมัยอยุธยากำหนดให้ชลบุรี
                        เป็นเมืองชั้นจัตวา
                        ส่วนแผนที่ไตรภูมิก็มีชื่อตำบลสำคัญของชลบุรีปรากฏอยู่เรียงจากเหนือลงใต้
                        คือ เมืองบางทราย เมืองบางปลาสร้อย เมืองบางพระเรือ
                        (ปัจจุบันคือบางพระ) และเมืองบางละมุง{" "}
                    </div>
                    <div className="leading-7">
                        แม้ว่าจะเป็นเพียงเมืองเล็กๆแต่ก็อุดมไปด้วยทรัพยากรทั้งบนบก
                        และในทะเล มีการทำไร่ ทำนา ทำสวน และออกทะเลมาแต่เดิม
                        นอกจากนี้ยังมีการติดต่อกับชาวจีนที่ล่องเรือสำเภา
                        เข้ามาค้าขายกับกรุงสยามด้วย
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="relative mt-6 aspect-[7/10] w-full max-w-[500px]  self-center">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                        <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                            สะพานอัษฎางค์, เกาะสีชัง
                        </div>
                        <Image
                            layout="fill"
                            objectFit="cover"
                            alt="สะพานอัษฏางค์"
                            quality="100"
                            blurDataURL="blurredUrl"
                            placeholder="blur"
                            src="https://lh3.ggpht.com/p/AF1QipNaBh_oBBALhCZG6_eL3pNKaLYVK6ChUNogr4XF=s5000"
                            className=""
                        />
                    </div>

                    <div className="flex w-full flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full max-w-[500px]  self-center md:self-stretch">
                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                            <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                                อุทยานหินล้านปีและฟาร์มจระเข้พัทยา, บางละมุง
                            </div>
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt="วัดญาณสังวราราม วรมหาวิหาร"
                                quality="100"
                                blurDataURL="blurredUrl"
                                placeholder="blur"
                                src="https://lh3.ggpht.com/p/AF1QipOVv6yAMLLw7UsP4q7wnY9mEr8ngDcB51O-rkcO=s512"
                                className=""
                            />
                        </div>
                        <div className="relative aspect-[5/4] w-full max-w-[500px]  self-center md:self-stretch">
                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                            <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                                วัดญาณสังวราราม วรมหาวิหาร, บางละมุง
                            </div>
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt="สะพานอัษฏางค์"
                                quality="100"
                                blurDataURL="blurredUrl"
                                placeholder="blur"
                                src="https://lh3.ggpht.com/p/AF1QipMw2ivB9nrPWGntFsxTQIWcVYcPOsSQFBTXnJsH=s512"
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col  md:flex-row">
                <div className="order-2 flex w-full gap-4 md:order-1 md:mr-16">
                    <div className="flex w-full flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full max-w-[500px]  self-center md:self-stretch">
                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                            <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                                อุทยานสามก๊ก, บางละมุง
                            </div>
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt="วัดญาณสังวราราม วรมหาวิหาร"
                                quality="100"
                                blurDataURL="blurredUrl"
                                placeholder="blur"
                                src="https://lh3.ggpht.com/p/AF1QipP5zyhdwZZPYa02i9Wekh2kXOMkEmgC9aLmsqQ=s512"
                                className=""
                            />
                        </div>
                        <div className="relative aspect-[5/4] w-full max-w-[500px]  self-center md:self-stretch">
                            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                            <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                                เกาะลอย, ศรีราชา
                            </div>
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt="สะพานอัษฏางค์"
                                quality="100"
                                blurDataURL="blurredUrl"
                                placeholder="blur"
                                src="https://lh3.ggpht.com/p/AF1QipOe8YF50UrtooRPmsv_1MwtGYfcrLc7zXG_5In_=s512"
                                className=""
                            />
                        </div>
                    </div>
                    <div className="relative mt-6 aspect-[7/10] w-full max-w-[500px]  self-center">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>
                        <div className="absolute bottom-3 left-4 z-10 text-lg font-medium text-white">
                            หาดถ้ำพัง, เกาะสีชัง
                        </div>
                        <Image
                            layout="fill"
                            objectFit="cover"
                            alt="สะพานอัษฏางค์"
                            quality="100"
                            blurDataURL="blurredUrl"
                            placeholder="blur"
                            src="https://lh3.ggpht.com/p/AF1QipPv-FVuq798mnXCKCD2oD4Lz-NRPhcpFrGVXU-2=s512"
                            className=""
                        />
                    </div>
                </div>
                <div className="order-1 flex w-full flex-col  justify-center tracking-wide md:order-2 ">
                    <div className="mb-10 leading-7 md:mb-0 ">
                        ดินแดนที่เรียกว่าจังหวัดชลบุรี
                        มีผู้คนอาศัยอยู่มาตั้งแต่สมัยก่อนประวัติศาสตร์แล้ว
                        คือสามารถย้อนไปได้จนถึงยุคหินขัด เช่น
                        บริเวณที่ลุ่มริมฝั่งแม่น้ำพานทอง
                        เคยมีมนุษย์ยุคหินใหม่อาศัยอยู่
                        โดยชนกลุ่มนี้นิยมใช้ขวานหินขัดเพื่อการเก็บหาล่าไล่
                        รวมถึงใช้ลูกปัด และกำไล
                        ภาชนะเครื่องปั้นดินเผาซึ่งมีลายที่เกิดจากการใช้เชือกทาบ
                        ลงไปขณะดินยังไม่แห้ง นอกจากนี้ยังพบเศษอาหารทะเลพวกหอย ปู
                        และปลาอีกด้วย เมื่อปี พ.ศ. 2522
                        ได้มีการขุดสำรวจที่ตำบลพนมดี อำเภอพนัสนิคม
                        พบร่องรอยของชุมชน โบราณก่อนประวัติศาสตร์โคกพนมดี
                        ทำให้สันนิษฐานได้ว่า ภายในเนื้อที่ 4,363 ตารางกิโลเมตร
                        ของชลบุรี
                        อดีตเคยเป็นที่ตั้งเมืองโบราณที่มีความรุ่งเรืองถึง 3
                        เมือง ได้แก่
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            passhref
                            href="https://th.wikipedia.org/wiki/%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%96"
                        >
                            <span className="ml-4 cursor-pointer text-primary underline ">
                                เมืองพระรถ
                            </span>
                        </Link>
                        ,
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            passhref
                            href="https://natchapat1120.wordpress.com/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%A1%E0%B8%B2/%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9E%E0%B9%82%E0%B8%A5-%E0%B8%A8%E0%B8%A3%E0%B8%B5%E0%B8%9E%E0%B8%B0%E0%B9%82%E0%B8%A3/"
                        >
                            <span className="ml-4 cursor-pointer text-primary underline ">
                                เมืองศรีพะโล
                            </span>
                        </Link>
                        ,
                        <Link
                            passhref
                            href="https://www.gotoknow.org/posts/464042"
                        >
                            <span className="ml-4 cursor-pointer text-primary underline ">
                                เมืองพญาเร่
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="my-20 h-[1px] w-full bg-text-lightest"></div>
            <AncientHistory />
            <AmphoeHistory />
        </div>
    );
};

const AncientHistory = () => {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="mb-7 text-3xl font-extrabold">
                เมืองโบราณในชลบุรี
            </div>
            <div className="">
                ชลบุรีในอดีตเคยเป็นที่ตั้งเมืองโบราณที่มีความรุ่งเรืองถึง 3
                เมือง ได้แก่
            </div>
            <div className="mb-14">
                เมืองพระรถ เมืองศรีพโล และ เมืองพญาเร่ โดยอาณาเขตของ 3
                เมืองนี้รวมกันเป็นจังหวัดชลบุรีในปัจจุบัน
            </div>
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                <AncientHistoryCard
                    text="ในสมัยทวารวดี และสมัยลพบุรี ประมาณ 1,400 ถึง 700 ปีก่อน
                บริเวณตำบลหน้าพระธาตุ อำเภอพนัสนิคมในปัจจุบัน
                มีร่องรอยของเมืองใหญ่ชื่อ “เมืองพระรถ”
                ตั้งอยู่ในที่ราบลุ่มซึ่งแม่น้ำหลายสายไหลมาบรรจบกันเป็นแม่น้ำพานทอง
                โดยสามารถใช้แม่น้ำสายนี้เป็นทางคมนาคมติดต่อกับเมืองศรีมโหสถในจังหวัดปราจีนบุรี
                (ปัจจุบันคือบริเวณบ้านสระมะเขือ บ้านโคกวัด และบ้านหนองสะแก
                อำเภอศรีมโหสถ) จนไปถึงอำเภออรัญประเทศได้
                อีกทั้งยังมีเส้นทางเดินเท้าเชื่อมไปถึงจังหวัดระยอง และจันทบุรี
                ผ่านเมืองพญาเร่ซึ่งเป็นเมืองโบราณสำคัญอีกแห่งหนึ่งของชลบุรี
                เมืองพระรถจึงกลายเป็นศูนย์กลางการคมนาคมของชลบุรีในยุคนั้นนอกจากนี้
                นักโบราณคดียังสำรวจพบว่าเมืองพระรถเป็นเมืองโบราณยุคเดียวกับเมืองศรีพโล
                หรือ เก่ากว่าเล็กน้อย
                เนื่องจากปรากฏว่ามีทางเดินโบราณเชื่อมต่อสองเมืองนี้ในระยะทางประมาณ
                20 กิโลเมตร"
                    name="เมืองพระรถ"
                    imageURL={palotImage}
                />
                <AncientHistoryCard
                    text="“เมืองศรีพโล” ตั้งอยู่บริเวณบ้านอู่ตะเภา ตำบลหนองไม้แดง อำเภอเมืองชลบุรี หน้าเมืองมีอาณาเขตจรดตำบลบางทรายในปัจจุบัน เคยมีผู้ขุดพบโบราณวัตถุหลายอย่าง เช่น พระพุทธรูปทองคำ สัมฤทธิ์ แก้วผลึก ขันทองคำ ถ้วยชามสังคโลกคล้ายของสุโขทัย จระเข้ปูน และก้อนศิลามีรอยเท้าสุนัข เป็นต้น นักโบราณคดีสันนิษฐานว่าเมืองศรีพโลเป็นเมืองในสมัยขอมเรืองอำนาจแห่งภูมิภาคอุษาคเนย์ และอาจจะมีอายุร่วมสมัยกับลพบุรีซึ่งอยู่หลังยุคอู่ทอง และก่อนยุคอยุธยา คือประมาณปี พ.ศ.1600 ถึง 1900
                    จากการขุดค้นทางโบราณคดีทำให้ทราบว่า  ตัวเมืองศรีพโลตั้งอยู่ใกล้กับปากน้ำบางปะกง  โดยเมื่อประมาณ 600 ปีก่อนในสมัยสุโขทัย เมืองนี้มีฐานะเป็นเมืองท่าชายทะเลที่มั่งคั่ง เปิดรับเรือสำเภาจากจีน กัมพูชา และเวียดนาม ให้มาจอดพักก่อนเดินทางต่อไปยังปากน้ำเจ้าพระยา (เป็นที่น่าเสียดายว่ากำแพงเมืองศรีพโลได้ถูกทำลายไปหมดสิ้นจากการก่อสร้างถนนสุขุมวิท จึงไม่เหลือร่องรอยทางโบราณคดีไว้ให้ศึกษา) ต่อมาในสมัยอยุธยา เมืองศรีพโลก็ค่อยๆ หมดความสำคัญลง อาจเพราะปากแม่น้ำตื้นเขินจากการพัดพาสะสมของตะกอนจำนวนมหาศาล ประชาชนจึงย้ายถิ่นฐานลงมาสร้างเมืองใหม่ที่ “บางปลาสร้อย” ซึ่งคือ “เมืองชลบุรี” ในปัจจุบัน (วัดใหญ่อินทารามในตัวเมืองชลบุรีปัจจุบัน ยังปรากฏภาพจิตรกรรมฝาผนังการค้าขายระหว่างคนไทย จีน  และฝรั่ง บ่งบอกถึงบรรยากาศการค้าขายอันคึกคักในอดีต)
                   "
                    name="เมืองศรีพโล"
                    imageURL={sripaloImage}
                />
                <AncientHistoryCard
                    text="“เมืองพญาเร่” ตั้งอยู่ในเขตตำบลบ่อทอง  อำเภอบ่อทอง เป็นเมืองยุคทวารวดีเช่นเดียวกับเมืองพระรถ เมืองนี้ตั้งอยู่ในเขตที่สูง ห่างจากเมืองพระรถประมาณ 32 กิโลเมตร ลักษณะผังเมืองเป็นรูปวงรี 2 ชั้น ชั้นแรกมีเส้นผ่าศูนย์กลางประมาณ 1,100 เมตร ส่วนชั้นในประมาณ 600 เมตร โดยคูเมือง และคันดินของตัวเมืองชั้นนอกทางด้านเหนือยังคงปรากฏเห็นได้ชัดเจนในปัจจุบัน
                    เมืองพญาเร่มีการติดต่อกับเมืองพระรถอยู่เนืองๆ โดยใช้คลองหลวงเป็นเส้นทางสัญจร ปัจจุบันลำคลองนี้ยังคงอยู่ โดยเป็นคลองสายสำคัญ และมีความยาวที่สุดของจังหวัดชลบุรี ทุกวันนี้การทำนาในอำเภอพนัสนิคม และอำเภอพานทอง ยังคงอาศัยน้ำจากคลองนี้ เนื่องจากมีแควหลายสายแตกสาขาออกไป แควใหญ่ที่สุด คือ แควที่เกิดจากทิวเขาป่าแดง
                    "
                    name="เมืองพญาเร่"
                    imageURL={payareImage}
                />
            </div>
        </div>
    );
};

const AncientHistoryCard = ({ name, text, imageURL }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full ">
            <div className="relative mb-3 h-[110px] w-full overflow-hidden rounded-md">
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#00000099] opacity-40 "></div>

                <div className="absolute bottom-2 left-3 z-10 text-2xl font-bold text-white">
                    {name}
                </div>
                <Image
                    layout="fill"
                    objectFit="cover"
                    alt="สะพานอัษฏางค์"
                    quality="100"
                    blurDataURL="blurredUrl"
                    placeholder="blur"
                    src={imageURL}
                />
            </div>
            <div
                className={` text-sm leading-7 tracking-wide text-text-lighter ${
                    isOpen ? "" : "ellipsis-line-3"
                }`}
            >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {text}
            </div>
            <div
                onClick={() => setIsOpen((e) => !e)}
                className="group flex w-full cursor-pointer items-center"
            >
                <div className="h-[1px] w-full bg-text-lightest "></div>
                <div className="mx-4 whitespace-nowrap py-4 text-sm font-light text-text-lighterr group-hover:text-text">
                    {isOpen ? "อ่านน้อยลง" : "อ่านเพิ่มเติม"}
                </div>
                <div className="h-[1px] w-full bg-text-lightest"></div>
            </div>
            {/* <div
                onClick={() => setIsOpen((e) => !e)}
                className="relative mx-auto mt-4 flex h-10 w-10 rounded-full border border-text-lightest"
            >
                <div className="absolute h-[60%] w-[1px] bg-text abs-center"></div>
            </div> */}
        </div>
    );
};

export default History;
