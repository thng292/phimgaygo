import Film from "../model/FilmModel";


class FilmDatasource {
    #FilmsDatabase: Film[] | undefined = [{
        id: 26327,
        name: 'Cho thuê vợ',
        length: '1 giờ 47 phút',
        country: 'Brazil',
        year: 2022,
        directors: "Cris D'amato",
        casts: ["Caio Castro", "Thati Lopes", "Mariana Xavier"],
        category: 'Comedy',
        soundTracks: [
            "Rebola – Iza feat. Gloria Groove & Carlinhos Brown",
            "Let a Little Love In – Caleb Hawley",
            "Chega – Duda Beat",
            "Estar Aqui – Nino & Esco",
            "NA MINHA CASA NÃO SE RACHA LENHA – Cast",
            "Salsa Por Boricua – Hernan T. Mulet",
            "O Amor Machuca Demais – Vitor Kley",
            "Trago Seu Amor De Volta – Pabllo Vittar feat. Dilsinho"
        ],
        availableIn: [
            {
                variant: '4K',
                price: 500000,
            },
            {
                variant: 'Gốc',
                price: 2000000,
            },
            {
                variant: '4K HDR',
                price: 1000000,
            },
            {
                variant: 'FullHD',
                price: 800000,
            },
            {
                variant: '720p',
                price: 500000,
            }
        ],
        description: 'Để hoàn thành tâm nguyện của người mẹ đang hấp hối và tránh bị xóa tên khỏi di chúc của bà, chàng độc thân cứng nhắc nọ bèn thuê một nữ diễn viên đóng vai hôn thê của mình.',
        comments: {
            name: "Barbara Shulgasser",
            content: "Không có gì mới ở đây, nhưng Castro đủ quyến rũ để lôi kéo nhân vật cổ trang này bằng sự duyên dáng và hóm hỉnh.",
        },
        imdbRating: 5.6,
        trailerUrl: "_SuUb1qq2hU",
        thumb: "https://image.tmdb.org/t/p/w342/6l6qR3JGf1WLJAwwYgIQPR5rLKz.jpg",
        banner: "https://image.tmdb.org/t/p/original/bwEtMHwa2N4LMIiRS6TfFrnjhQb.jpg"
    },
    {
        id: 25586,
        name: "2050",
        length: "1 giờ 42 phút",
        year: 2022,
        country: "Mỹ",
        directors: "Princeton Holt",
        casts: ["David Vaughn", "Irina Abraham", "Devin Fuller"],
        category: "Comedy",
        soundTracks: ["AP", "https://embed.music.apple.com/us/album/2050-original-motion-picture-soundtrack/1491108077"],
        description: "Một người đàn ông đang đấu tranh để giữ hạnh phúc gia đình phát hiện ra một dịch vụ cung cấp một giải pháp ... sexbots.",
        availableIn: [
            {
                variant: '4K',
                price: 500000,
            },
            {
                variant: 'Gốc',
                price: 2000000,
            },
            {
                variant: '4K HDR',
                price: 1000000,
            },
            {
                variant: 'FullHD',
                price: 800000,
            },
            {
                variant: '720p',
                price: 500000,
            }
        ],
        comments: {
            name: "Noel Murray from Los Angeles Times",
            content: '"2050" có một chủ đề có ý nghĩa, nhưng quá nặng về đối thoại và nhẹ nhàng đến mức gần như toàn bộ bộ phim có cảm giác như một màn chào sân cho bộ phim mà Holt đã không thực hiện.',
        },
        imdbRating: 3.7,
        trailerUrl: "SKV-USFlfmc",
        thumb: "https://image.tmdb.org/t/p/w342/cSKXdkm38HIMsZZNYJDIOtfOV9B.jpg",
        banner: "https://image.tmdb.org/t/p/original/eoc2P3qH6CkDX56c68PZaDZ6Xnb.jpg"
    },
    {
        id: 25558,
        name: "Tôi từng nổi tiếng",
        length: "1 giờ 44 phút",
        country: "Anh",
        directors: "Eddie Sternberg",
        casts: ["Ed Skrein", "Eleanor Matsuura", "Leo Long"],
        category: "Comedy",
        soundTracks: ["AP", "https://embed.music.apple.com/us/album/i-used-to-be-famous-soundtrack-from-the-netflix-film/1642788025"],
        year: 2022,
        availableIn: [
            {
                variant: '4K',
                price: 500000,
            },
            {
                variant: 'Gốc',
                price: 2000000,
            },
            {
                variant: '4K HDR',
                price: 1000000,
            },
            {
                variant: 'FullHD',
                price: 800000,
            },
            {
                variant: '720p',
                price: 500000,
            }
        ],
        description: "Cựu ngôi sao của nhóm nhạc nam bất ngờ có cơ hội thành danh trở lại khi kết giao với một tay trống trẻ tài năng.",
        comments: {
            name: "Kevin Maher Times (UK)",
            content: "The narrative structure is whoppingly predictable, yet the journey is sweetly handled, and the performances deeply likeable.",
        },
        imdbRating: 6.6,
        trailerUrl: "S7zP4ccVxYY",
        thumb: "https://image.tmdb.org/t/p/w342/hJMnsf6vzgoNx0bv3uh3PTCjmks.jpg",
        banner: "https://image.tmdb.org/t/p/original/mN0iadY7U4mUvXuoLBwwjtGAD32.jpg"
    },
    {
        id: 22442,
        name: "Chuyện Văn Phòng",
        length: "8 Tập",
        country: "Mỹ",
        directors: "Greg Daniels",
        casts: ["Steve Carell", "Jenna Fischer", "John Krasinski"],
        category: "Comedy",
        soundTracks: ["AP", "https://embed.music.apple.com/us/album/the-office-theme-from-tv-series-ep/439309149"],
        year: 2022,
        availableIn: [
            {
                variant: '4K',
                price: 500000,
            },
            {
                variant: 'Gốc',
                price: 2000000,
            },
            {
                variant: '4K HDR',
                price: 1000000,
            },
            {
                variant: 'FullHD',
                price: 800000,
            },
            {
                variant: '720p',
                price: 500000,
            }
        ],
        description: "The Office là phim hài được NBC sản xuất từ năm 2005 đến 2013. Phim xoay quanh cuộc sống thường nhật của các nhân viên văn phòng tại Dunder Mifflin, một công ty cung cấp giấy tọa ở Scranton, Pennsylvania. Lăng kính câu chuyện hướng đến là những tin đồn, trò đùa ngớ ngẩn, drama đầy rẫy hay cả chuyện anh này thích chị kia nơi công sở cũng được đưa hết lên phim. Nếu bạn từng ghét sếp, công việc của bạn hoặc cả hai, thì bạn sẽ thích chương trình này.",
        comments: {
            name: "David Hinckley from New York Daily News",
            content: "Tôi thực sự tò mò nhưng cuối cùng rất hy vọng về hướng đi cho mùa giải tới, phần lớn là vì mùa giải này quá xuất sắc.",
        },
        imdbRating: 9.0,
        trailerUrl: "tNcDHWpselE",
        thumb: "https://image.tmdb.org/t/p/w342/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
        banner: "https://image.tmdb.org/t/p/original/vNpuAxGTl9HsUbHqam3E9CzqCvX.jpg"
    }, {
        id: 26611,
        name: "Tấm vé đến thiên đường",
        length: "1 giờ 44 phút",
        country: "Anh",
        directors: "OI Parker",
        casts: ['George Clooney', 'Sean Lynch', 'Julia Roberts'],
        category: "Comedy",
        soundTracks: ["AP", "https://embed.music.apple.com/us/album/ticket-to-paradise-original-motion-picture-soundtrack/1642843428"],
        year: 2022,
        availableIn: [
            {
                variant: '4K',
                price: 500000,
            },
            {
                variant: 'Gốc',
                price: 2000000,
            },
            {
                variant: '4K HDR',
                price: 1000000,
            },
            {
                variant: 'FullHD',
                price: 800000,
            },
            {
                variant: '720p',
                price: 500000,
            }
        ],
        description: 'Hai diễn viên kỳ cựu của Hollywood - George Clooney và Julia Roberts sẽ tái hợp trên màn ảnh rộng trong vai đôi vợ chồng đã li hôn, nhưng lại cùng chung sứ mệnh ngăn cản cuộc kết hôn của đứa con gái yêu. Bởi họ sợ rằng con gái đang mắc phải sai lầm tương tự điều mà họ đã từng trải qua. Ticket to Paradise là một bộ phim hài lãng mạn về sự ngọt ngào bất ngờ của "cơ hội thứ hai”.',
        comments: {
            name: "Collin Garbarino from WORLD",
            content: "Kịch bản công thức có lợi cho bộ phim. ... Người hâm mộ của thể loại này biết tất cả những điều này đang hướng đến đâu, nhưng cuộc hành trình quá thú vị để bỏ qua.",
        },
        imdbRating: 6.2,
        trailerUrl: "hkP4tVTdsz8",
        thumb: "https://image.tmdb.org/t/p/w342/1tzERH50P5c2mFWtLbgixzLZS1L.jpg",
        banner: "https://image.tmdb.org/t/p/original/ulyR4pWVMRtVcanoassVbmgfEPT.jpg"
    }
    ]
    #CurrentFilm: Film | undefined = undefined
    constructor() {
        // TODO
    }
    
    getFilms(category: string, numberOfResults: number = 20): Map<string, Film[]> {
        this.#FilmsDatabase = this.#FilmsDatabase ?? []
        if (category === 'all') {
            let ans = new Map<string, Film[]>()
            ans.set('recommend', [])
            for (let i of this.#FilmsDatabase) {
                if (ans.has(i.category)) {
                    if ((ans.get(i.category)?.length ?? numberOfResults) < numberOfResults) {
                        ans.get(i.category)?.push(i)
                    }
                } else {
                    ans.set(i.category, [i])
                    ans.get('recommend')?.push(i)                
                }
            }
            return ans
        }
        let ans: Film[] = []
        let cnt = 0;
        for (let i of this.#FilmsDatabase) {
            if (i.category === category) {
                cnt++;
                ans.push(i);
            }
            if (cnt>=numberOfResults) break
        }
        let tmp = new Map<string, Film[]>()
        tmp.set(category, ans)
        return tmp
    }

    search(keyword: string): Film[] {
        let ans: Film[] = []
        return ans;
    }
}

export default FilmDatasource