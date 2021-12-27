import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import faker from 'faker';
import Button from '@mui/material/Button';

const generateFakeData = (() => {
    const data = [];
    for (let i = 0; i < 5000; i++) {
        data.push({ id: i, selected: false, label: faker.address.county() })
    }
    return () => data;
})();

function SelectionDialog(props) {
    const [selectAll, setSelectAll] = React.useState(false);
    const [storeList, setStoreList] = React.useState([]);
    const { onClose, open } = props;

    React.useEffect(() => {
        setStoreList(generateFakeData());
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
        <FormGroup style={{marginLeft: 15}}>
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

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>Set backup account</DialogTitle>
            {selectAllJSX()}
            <List sx={{ pt: 0 }}>
                {storeList.map(({ label, selected, id }, index) => (
                    <ListItem button onClick={() => onCheckboxClick(index)} key={id}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={selected} onClick={() => onCheckboxClick(index)} />} label={label} />
                         </FormGroup>
                    </ListItem>
                ))}
            </List>
            <br />
            <Button variant="text" onClick={handleClose}>
                Apply
            </Button>
        </Dialog>
    );
}

export default React.memo(SelectionDialog);