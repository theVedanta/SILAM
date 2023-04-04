// https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_005.png

import {
    Box,
    Button,
    Flex,
    Image,
    Progress,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Spinner,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
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
        <ChakraProvider>
            {end ? (
                <Flex position="relative" p={10}>
                    <Image
                        position="fixed"
                        top={0}
                        left={0}
                        width={800}
                        height={1000}
                        src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                            currentNum - 1
                        )}.png`}
                    />
                </Flex>
            ) : (
                <>
                    {displayImg === -1 ? (
                        window.location.reload()
                    ) : (
                        <Flex position="relative" p={10}>
                            <Image
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                    currentNum
                                )}.png`}
                                onLoad={() => setCurrentNum(currentNum + 1)}
                                onError={onError}
                                opacity={displayImg === 1 ? 1 : 0}
                            />
                            <Image
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                    currentNum
                                )}.png`}
                                onLoad={() => setCurrentNum(currentNum + 1)}
                                onError={onError}
                                opacity={displayImg === 2 ? 1 : 0}
                            />
                            <Image
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                    currentNum
                                )}.png`}
                                onLoad={() => setCurrentNum(currentNum + 1)}
                                onError={onError}
                                opacity={displayImg === 3 ? 1 : 0}
                            />
                            <Image
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                    currentNum
                                )}.png`}
                                onLoad={() => setCurrentNum(currentNum + 1)}
                                onError={onError}
                                opacity={displayImg === 4 ? 1 : 0}
                            />
                            <Image
                                position="fixed"
                                top={0}
                                left={0}
                                width={800}
                                height={1000}
                                src={`https://silam.fmi.fi/AQ/operational/europe/AQ/000/AQI_${formatNum(
                                    currentNum
                                )}.png`}
                                onLoad={() => setCurrentNum(currentNum + 1)}
                                onError={onError}
                                opacity={displayImg === 5 ? 1 : 0}
                            />
                        </Flex>
                    )}
                </>
            )}

            <Box position="fixed" bottom={10} right={10}>
                <Flex>{displayImg === 0 && <Spinner size="lg" />}</Flex>
                <Flex>
                    {currentNum}-{displayImg}&nbsp;
                    {end ? "end" : "Chalrah"}
                </Flex>

                <Button onClick={() => setEnd(!end)} colorScheme="blue">
                    Pause/Play/Reload
                </Button>
                <Button
                    onClick={() => {
                        setCurrentNum(1);
                        setDisplayImg(0);
                        setEnd(false);
                    }}
                    colorScheme="purple"
                >
                    Reset
                </Button>
                <br />
                <br />
                <Box w="30vw">
                    <Slider
                        aria-label="slider-ex-1"
                        value={(currentNum / 121) * 100}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default App;
