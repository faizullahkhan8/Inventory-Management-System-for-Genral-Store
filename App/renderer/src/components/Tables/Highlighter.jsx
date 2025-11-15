const Hightlighter = ({ text = "", query = "" }) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
        regex.test(part) ? (
            <span key={i} className="bg-yellow-300 font-bold">
                {part}
            </span>
        ) : (
            part
        )
    );
};

export default Hightlighter;
