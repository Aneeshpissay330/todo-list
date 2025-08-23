import { Header as CustomHeader, IconButton } from '@Aneeshpissay330/components-ui';

const Header = () => {
    return (
        <CustomHeader
            title='TODO'
            rightContent={<IconButton icon={<span className="material-symbols-outlined">
                dark_mode
            </span>} />}
        />
    )
}

export default Header;