// https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_005.png
// tbranzov@math.bas.bg

import {
    Box,
    Button,
    Flex,
    IconButton,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { IoReloadOutline } from "react-icons/io5";

const Home = () => {
    const [currentNum, setCurrentNum] = useState(1);
    const [displayImg, setDisplayImg] = useState(0);
    const [end, setEnd] = useState(false);
    const toast = useToast();

    const formatNum = (num) => {
        return num.toString().length === 1
            ? `00${num}`
            : num.toString().length === 2
            ? `0${num}`
            : num;
    };

    const onError = () => {
        setEnd(true);
        if (!toast.isActive("err"))
            toast({
                title: "End of the line",
                status: "error",
                id: "err",
            });
    };

    useEffect(() => {
        // INITIAL
        if (displayImg === 0) {
            if (currentNum % 4 === 0) {
                return setDisplayImg(1);
            }
            // ACTUAL INCREMENT
        } else setDisplayImg(displayImg === 5 ? 1 : displayImg + 1);
    }, [currentNum]);

    return (
        <>
            {end ? (
                <Flex position="relative" p={10}>
                    <Box position="fixed" top={0} left={0}>
                        <Image
                            width={800}
                            height={1000}
                            src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                currentNum - 1
                            )}.png`}
                            alt="display-img"
                        />
                    </Box>
                </Flex>
            ) : (
                <>
                    {displayImg === -1 ? (
                        window.location.reload()
                    ) : (
                        <Flex position="relative" p={10}>
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                opacity={displayImg === 1 ? 1 : 0}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        currentNum
                                    )}.png`}
                                    onLoadingComplete={() =>
                                        setCurrentNum(currentNum + 1)
                                    }
                                    onError={onError}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                opacity={displayImg === 2 ? 1 : 0}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        currentNum
                                    )}.png`}
                                    onLoadingComplete={() =>
                                        setCurrentNum(currentNum + 1)
                                    }
                                    onError={onError}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                opacity={displayImg === 3 ? 1 : 0}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        currentNum
                                    )}.png`}
                                    onLoadingComplete={() =>
                                        setCurrentNum(currentNum + 1)
                                    }
                                    onError={onError}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                opacity={displayImg === 4 ? 1 : 0}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        currentNum
                                    )}.png`}
                                    onLoadingComplete={() =>
                                        setCurrentNum(currentNum + 1)
                                    }
                                    onError={onError}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                            <Box
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                opacity={displayImg === 5 ? 1 : 0}
                            >
                                <Image
                                    priority
                                    loading="eager"
                                    src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                        currentNum
                                    )}.png`}
                                    onLoadingComplete={() =>
                                        setCurrentNum(currentNum + 1)
                                    }
                                    onError={onError}
                                    width={800}
                                    height={1000}
                                    alt="display-img"
                                />
                            </Box>
                        </Flex>
                    )}
                </>
            )}

            <Box
                position="fixed"
                top="50%"
                right={72}
                boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                p={6}
                rounded="xl"
            >
                {/* <Flex>{displayImg === 0 && <Spinner size="lg" />}</Flex>
                <Flex>
                    {currentNum}-{displayImg}&nbsp;
                    {end ? "end" : "Chalrah"}
                </Flex> */}

                <Flex>
                    <IconButton onClick={() => setEnd(!end)} colorScheme="blue">
                        {end ? <BsFillPlayFill /> : <BsFillPauseFill />}
                    </IconButton>
                    &nbsp;
                    <IconButton
                        onClick={() => {
                            setCurrentNum(1);
                            setDisplayImg(0);
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
                        value={(currentNum / 121) * 100}
                        onChange={(val) => {
                            setCurrentNum(parseInt((val / 100) * 121));
                        }}
                        onMouseEnter={() => setEnd(true)}
                        onMouseLeave={() => setEnd(false)}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
            </Box>
        </>
    );
};

export default Home;
