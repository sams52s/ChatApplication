import "./chatbox.css";

const ChatBox = (props) => {

    return (
        <div align={ props.self ? 'right' : 'left' }>
            <div className='chat-size-limiter'>
                <div className={`chat-${ props.self ? 'sender' : 'receiver' }-item text-${ props.self ? 'dark' : 'light' }`}>

                    <div className={`chat-${ props.self ? 'sender' : 'receiver' }-subtitle`}>{props.sub}</div>
                    {props.message}
                </div>
            </div>
            
        </div>
    );
}
 
export default ChatBox;