import React from 'react';
import './CustomVirtualizedList.css';
import faker from 'faker';

const generateFakeData = (() => {
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({ id: i, selected: false, label: faker.address.state() })
    }
    return () => data;
})();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const ListElement = (props) => {
    const [visible, setVisible] = React.useState(false);
    const {containerRef} = props;
    const elementRef = React.useRef();
    let intersectionObserver;

    const onVisibilityChange = ([entry]) => {
        setVisible(entry.isIntersecting)
    }

    // React.useEffect(() => {
    //     if(!visible) {
    //         elementRef.current.style.display ="none"
    //     }
    // }, [visible]);

    React.useEffect(() => {
        console.log(props);
        intersectionObserver = new IntersectionObserver(onVisibilityChange, containerRef.current);
        intersectionObserver.observe(elementRef.current);
        return () => {
            intersectionObserver.disconnect()
        }
    }, [])

    return <div
        ref={elementRef}
        style={{ backgroundColor: getRandomColor() }}
        className="listElement">
        {visible ? 'I am visible' : 'I am not visible'}
    </div>
}

export const ListContainer = () => {
    const containerRef = React.useRef();
    const [data, setData] = React.useState(generateFakeData())

    return (
        <div className="listContainer">
            {data.map(val => {
                return <ListElement containerRef={containerRef} {...val} />
            })}
        </div>
    );
};

