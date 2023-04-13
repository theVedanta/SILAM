// https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_005.png
// tbranzov@math.bas.bg

// Check the display state skipping
// Flickering - partially fixed

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
    const [current, setCurrent] = useState(1);
    const [end, setEnd] = useState(false);
    const [display, setDisplay] = useState(0);

    const formatNum = (num) => {
        return num.toString().length === 1
            ? `00${num}`
            : num.toString().length === 2
            ? `0${num}`
            : num;
    };

    useEffect(() => {
        console.log(display);
        if (display >= 4) {
            setDisplay(0);
            setCurrent(current + 5);
        }
    }, [display]);

    return (
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
                    {[0, 1, 2, 3, 4].map((i) => (
                        <Flex
                            position="fixed"
                            top={0}
                            left={0}
                            width={800}
                            height={1000}
                            display={display === i ? "flex" : "none"}
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
                                    i >= display && setDisplay((d) => d + 1);
                                    // article relates to
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
                right={72}
                boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                p={6}
                rounded="xl"
            >
                <Flex>
                    <IconButton onClick={() => setEnd(!end)} colorScheme="blue">
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
