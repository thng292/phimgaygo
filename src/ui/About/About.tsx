import React from "react";

function About() {
    return <>In progress</>
    return <div className="center-child column" style={{
        width: '100%',
        fontSize: '2rem',
        fontWeight: 'bold',
    }}>
        <div className="center-child" style={{
            height: '400px',
        }}>
            <p style={{
                maxWidth: '800px',
                margin: '20px',
                textAlign: 'justify',
            }}>Nhóm 1 - Công nghệ thông tin được thành lập với không những với sự mệnh hoàn thành đồ án được giao mà còn đem đến cho người dùng một nơi để có thể thoải mái tìm và tận hưởng tấn tần tật những bộ phim mà mình thích.</p>
        </div>
        <div className="center-child" style={{
            backgroundColor: 'black',
            height: '400px',
            width: '100%',
            color: 'white'
        }}>
            <p style={{
                maxWidth: '800px',
                margin: '20px',
                textAlign: 'justify',
            }}>Trải nghiệm tuyệt vời của bạn tại trang web của chúng tôi là một niềm tự hào to lớn của Nhóm 1 - Công nghệ thông tin</p>
        </div>
        <div className="center-child" style={{
            height: '400px',
        }}>
            <p style={{
                maxWidth: '800px',
                margin: '20px',
                textAlign: 'justify',
            }}>Trụ sở: 227 Nguyễn Văn Cừ, phường 4, quận 5, Thành phố Hồ Chí Minh..</p>
        </div>
    </div>
}

export default About