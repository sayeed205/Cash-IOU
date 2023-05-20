import "./FilledBtn.css";

interface FilledBtnProps {
    text: string;
}

const FilledBtn = (props: FilledBtnProps): JSX.Element => {
    const { text } = props;
    return (
        <div className="button-container">
            <button className="button-filled">{text}</button>
        </div>
    );
};

export default FilledBtn;
