import { Header as CustomHeader, IconButton } from '@Aneeshpissay330/components-ui';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectIsDark, toggleTheme } from '../features/theme';

const Header = () => {
    const dispatch = useAppDispatch();
    const isDark = useAppSelector(selectIsDark);

    const backgroundColor = isDark ? "#FFFFFF" : "#1F2937";
    const color = isDark ? "#1F2937" : "#FFFFFF";
    return (
        <CustomHeader
            title='TODO'
            rightContent={<IconButton color={color} backgroundColor={backgroundColor} onClick={() => dispatch(toggleTheme())} icon={<span className="material-symbols-outlined">
                {isDark ? "light_mode" : "dark_mode"}
            </span>} />}
        />
    )
}

export default Header;