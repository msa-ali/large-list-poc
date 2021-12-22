import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import faker from 'faker';
import { FixedSizeList, FixedSizeGrid } from 'react-window';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const generateFakeData = (() => {
    const data = [];
    for (let i = 0; i < 15000; i++) {
        data.push({ id: i, selected: false, label: faker.address.state() })
    }
    return () => data;
})();

function OptimisedDialog(props) {
    const [selectAll, setSelectAll] = React.useState(false);
    const [storeList, setStoreList] = React.useState([]);
    const [searchText, setSearchText ] = React.useState('');
    const { onClose, open } = props;
    const fakeData = generateFakeData();

    React.useEffect(() => {
        setStoreList(fakeData);
    }, [])

    const handleClose = () => {
        const selectedCount = storeList.filter(store => store.selected).length;
        onClose(selectedCount);
    };

    const onCheckboxClick = (index) => {
        setStoreList((storeList) => {
            const stores = [...storeList];
            stores[index].selected = !storeList[index].selected;
            return stores;
        })
    }

    // const outerElementType = React.forwardRef((props, ref) => {
    //     return <div ref={ref} onClick={onCheckboxClick} {...props}/>
    // });

    const Row = (args) => {
        const { data, index, style } = args;
        // 
        return (
            <div style={style}>
                <ListItem button key={data[index].id} onClick={() => onCheckboxClick(index)}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data[index].selected}
                                    onClick={() => onCheckboxClick(index)}
                                />
                            }
                            label={data[index].label}
                        />
                    </FormGroup>
                </ListItem>
            </div>
        );
    }

    const onSelectAllToggle = () => {
        setSelectAll(selectAll => {
            setStoreList(storeList => {
                storeList.forEach(store => {
                    store.selected = !selectAll;
                })
                return storeList;
            });
            return !selectAll;
        });

    }

    const selectAllJSX = () => (
        <FormGroup style={{ marginLeft: 15 }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectAll}
                        onClick={onSelectAllToggle}
                    />
                }
                label="Select All"
            />
        </FormGroup>
    )

    const onSearchTextChange = (event) => {
        const query = event.target.value;
        setSearchText(query);
        const filteredData = fakeData.filter(data => data.label?.toLowerCase().includes(query.toLowerCase()));
        setStoreList(filteredData);
    }

    return (
        <Dialog
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
            open={open} fullWidth
        >
            <DialogTitle>Select States</DialogTitle>
            <TextField 
                variant="standard" 
                placeholder='Search' 
                style={{marginLeft: 20, marginRight: 20}}
                value={searchText}
                onChange={onSearchTextChange}
            />
            {selectAllJSX()}
            <FixedSizeList
                height={900}
                itemCount={storeList.length}
                itemSize={45}
                width={600}
                itemData={storeList}
            // outerElementType={outerElementType}
            >
                {Row}
            </FixedSizeList>
            <br />
            <Button variant="text" onClick={handleClose}>
                Apply
            </Button>
        </Dialog>
    );
}

export default React.memo(OptimisedDialog);