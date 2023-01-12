import React, { FC, useEffect, useRef, useState } from "react";
import Title from "../Component/Title";
import { media_type } from "../../../data/Datasource/Config";
import TitlePlaceholder from "../Component/TitlePlaceholder";
import DuplicateStuff from "../../../utils/DuplicateStuff";
import SVG_NavForward from "../SVG/SVG_NavForward";
import SVG_NavBack from "../SVG/SVG_NavBack";

const TitlesRow: FC<
    | {
          titles: string[];
          media_type: media_type[]; //Length = 1 => same type
          ids: number[];
          name: string;
          subtitles: string[];
          genres: string[];
          dates: string[];
          vote_avgs: string[];
          imagesFullURL: string[];
          tags?: string[];
          btn1Icon: JSX.Element;
          btn1Action: (id: number, type: media_type) => void;
          btn2Icon: JSX.Element;
          btn2Action: (id: number, type: media_type) => void;
          onClickAction: (id: number, type: media_type) => void;
          onSeeMore?: () => void;
          itemWidth?: number;
          className?: string;
      }
    | {
          placeholder: true;
          name: string;
          itemWidth?: number;
          className?: string;
          onSeeMore?: () => void;
      }
> = (props) => {
    if ("placeholder" in props) {
        return (
            <div className={props.className}>
                <p
                    className='font-bold text-2xl p-2 group cursor-pointer'
                    onClick={props.onSeeMore}
                >
                    {props.name}
                    {props.onSeeMore && (
                        <span
                            className={
                                "text-sm font-normal px-4 h-full tracking-normal text-right inline-block opacity-0 transition-all group-hover:opacity-100"
                            }
                        >
                            See More...
                        </span>
                    )}
                </p>
                <div className={"scroll-wrapper"}>
                    <div className={"flex gap-2 py-3"}>
                        {DuplicateStuff(
                            <TitlePlaceholder itemWidth={props.itemWidth} />,
                            5
                        )}
                        {props.onSeeMore && (
                            <div
                                style={{ width: props.itemWidth }}
                                className={
                                    "flex items-center justify-center hover:scale-105 transition-all duration-500 transform-gpu rounded-sm bg-transparent hover:bg-gray-600 group"
                                }
                            >
                                <p
                                    className={
                                        "group-hover:tracking-widest text-xl font-bold transition-all duration-500"
                                    }
                                >
                                    See More
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    const rowRef = useRef<HTMLDivElement | null>(null);
    const scrollPos = getScrollPos(rowRef);
    return (
        <div className={(props.className ?? "") + " relative"}>
            <p
                className='font-bold text-2xl p-2 group cursor-pointer'
                onClick={props.onSeeMore}
            >
                {props.name}
                {props.onSeeMore && (
                    <span
                        className={
                            "text-sm font-normal px-4 h-full tracking-normal text-right inline-block opacity-0 transition-all group-hover:opacity-100"
                        }
                    >
                        See More...
                    </span>
                )}
            </p>
            <button
                className={
                    "absolute bottom-0 right-0 z-30 w-fit bg-gradient-to-l from-black transition-all duration-200 TitleRowBtn"
                }
                style={{
                    visibility:
                        scrollPos >=
                        (rowRef.current?.scrollWidth ?? 0) - window.innerWidth
                            ? "hidden"
                            : "visible",
                    opacity:
                        scrollPos >=
                        (rowRef.current?.scrollWidth ?? 0) - window.innerWidth
                            ? "0"
                            : "100%",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    rowRef.current?.scrollBy({
                        behavior: "smooth",
                        left: window.innerWidth,
                    });
                }}
            >
                <SVG_NavForward />
            </button>

            <button
                className={
                    "absolute bottom-0 left-0 z-30 w-fit bg-gradient-to-r from-black transition-all duration-200 TitleRowBtn"
                }
                style={{
                    visibility: scrollPos > 0 ? "visible" : "hidden",
                    opacity: scrollPos > 0 ? "100%" : "0",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    rowRef.current?.scrollBy({
                        behavior: "smooth",
                        left: -window.innerWidth,
                    });
                }}
            >
                <SVG_NavBack />
            </button>
            <div
                className={"scroll-wrapper"}
                ref={rowRef}
            >
                <div className={"flex py-3"}>
                    {props.ids.map((id, index) => {
                        let currTag =
                            props.media_type.at(index) ??
                            props.media_type.at(0) ??
                            "movie";
                        return (
                            <Title
                                key={props.name + currTag + id}
                                type={
                                    props.media_type[
                                        index <= props.media_type.length
                                            ? index
                                            : 0
                                    ]
                                }
                                tag={props.tags?.at(index)}
                                title={props.titles[index]}
                                imageFullURL={props.imagesFullURL[index]}
                                subtitle={props.subtitles[index]}
                                genre={props.genres[index]}
                                date={props.dates[index]}
                                vote_avg={props.dates[index]}
                                btn1Icon={props.btn1Icon}
                                btn1Action={() => props.btn1Action(id, currTag)}
                                btn2Icon={props.btn2Icon}
                                btn2Action={() => props.btn2Action(id, currTag)}
                                onClickAction={() =>
                                    props.onClickAction(id, currTag)
                                }
                                style={{
                                    width: props.itemWidth,
                                    marginLeft: "0.5rem",
                                }}
                            />
                        );
                    })}
                    {props.onSeeMore && (
                        <div
                            style={{ width: props.itemWidth }}
                            className={
                                "flex items-center justify-center hover:scale-105 transition-all duration-500 transform-gpu rounded-sm bg-transparent hover:bg-gray-600 group"
                            }
                        >
                            <p
                                className={
                                    "group-hover:tracking-widest text-xl font-bold transition-all duration-500"
                                }
                            >
                                See More
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TitlesRow;

function getScrollPos(rowRef: React.MutableRefObject<HTMLDivElement | null>) {
    const [scrollPos, updateScrollPos] = useState<number>(0);
    useEffect(() => {
        const changeScrollState = () => {
            // console.log(rowRef.current?.scrollLeft)
            updateScrollPos(rowRef.current?.scrollLeft ?? 0);
        };
        rowRef.current?.addEventListener("scroll", changeScrollState);

        return () => {
            rowRef.current?.removeEventListener("scroll", changeScrollState);
        };
    }, []);
    return scrollPos;
}
