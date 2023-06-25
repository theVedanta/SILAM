// https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_005.png
// tbranzov@math.bas.bg

import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IoReloadOutline } from "react-icons/io5";

const Home = () => {
    const [current, setCurrent] = useState(1);
    const [end, setEnd] = useState(false);
    const [display, setDisplay] = useState(0);
    const [imgList, setImgList] = useState([]);
    const [opting, setOpting] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [start, setStart] = useState();
    const mbs = 40.0187;
    let s = new Date();
    let e;

    const formatNum = (num) => {
        return num.toString().length === 1
            ? `00${num}`
            : num.toString().length === 2
            ? `0${num}`
            : num;
    };

    const optimizerLoaded = () => {
        const endTM = new Date();
        if (!start) return;
        const secs = (endTM.getTime() - start.getTime()) / 1000;

        console.log(mbs / secs);
        setSpeed(mbs / secs);
        setOpting(false);
    };

    useEffect(() => {
        if (display >= imgList.length - 1) {
            setDisplay(0);
            setCurrent(current + imgList.length);
        }
    }, [display]);

    useEffect(() => {
        (async () => {
            if (speed !== 0) return;

            document.querySelector("#load-img") &&
                document
                    .querySelector("#load-img")
                    .setAttribute(
                        "src",
                        `https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg?uncache=${new Date()}`
                    );
            setStart(new Date());
        })();
    }, []);

    useEffect(() => {
        // if (speed === 0) return;
        // let i = 0;

        // if (speed > 7) i = 1;
        // else if (speed > 3) i = 2;
        // else if (speed > 1) i = 3;
        // else if (speed > 0.1) i = 4;
        // else i = 5;

        // let imgListDummy = [];
        // for (let j = 0; j < i; j++) {
        //     imgListDummy.push(j);
        // }

        // console.log(imgListDummy);

        setImgList([0]);
    }, [speed]);

    return (
        <>
            {opting ? (
                <Box
                    width="100vw"
                    height="100vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading mb={5}>
                        Please wait while we optimize for your network
                    </Heading>
                    <Text mb={20}>Internet Speed: </Text>
                    <Spinner size="lg" />

                    <img
                        id="load-img"
                        style={{ display: "none" }}
                        onLoad={optimizerLoaded}
                    />
                </Box>
            ) : (
                <>
                    {end ? (
                        <Flex position="relative">
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        current - 1
                                    )}.png`}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                        </Flex>
                    ) : (
                        <Flex position="relative">
                            {imgList.map((i) => (
                                <Flex
                                    position="fixed"
                                    top={0}
                                    left={0}
                                    width={800}
                                    height={1000}
                                    // display={display === i ? "flex" : "none"}
                                    opacity={display === i ? 1 : 0}
                                    transition="all 0.05s"
                                    key={i}
                                    justifyContent="center"
                                    direction="column"
                                    alignItems="center"
                                >
                                    <Image
                                        priority
                                        loading="eager"
                                        src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                            current + i
                                        )}.png`}
                                        onLoadingComplete={() => {
                                            e = new Date();
                                            console.log(
                                                (e.getTime() - s.getTime()) /
                                                    1000
                                            );
                                            i >= display && setDisplay(i + 1);
                                        }}
                                        onError={() => setEnd(true)}
                                        width={800}
                                        height={1000}
                                        alt="display-img"
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    )}

                    <Box
                        position="fixed"
                        top="50%"
                        right={44}
                        boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                        p={6}
                        rounded="xl"
                    >
                        {imgList.length}
                        <br />
                        <br />
                        <Flex>
                            <IconButton
                                onClick={() => setEnd(!end)}
                                colorScheme="blue"
                            >
                                {end ? <BsFillPlayFill /> : <BsFillPauseFill />}
                            </IconButton>
                            &nbsp;
                            <IconButton
                                onClick={() => {
                                    setCurrent(1);
                                    setDisplay(0);
                                    setEnd(false);
                                }}
                                colorScheme="purple"
                            >
                                <IoReloadOutline />
                            </IconButton>
                        </Flex>

                        <br />
                        <Box w="25vw">
                            <Slider
                                aria-label="slider-ex-1"
                                value={(current / 120) * 100}
                                onChange={(val) => {
                                    setCurrent(parseInt((val / 100) * 120));
                                }}
                                onMouseEnter={() => setEnd(true)}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default Home;
