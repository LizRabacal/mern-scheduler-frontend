import React from "react";
import { Link, Box, Flex, Text, Button, Stack, Progress } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <NavBarContainer id="nav" {...props}>
             <Text display='flex' alignItems='center' gap={1} fontSize={18} >
                    Agendinha <img width='10%' src="/iconea.png" />

             </Text>
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <MenuLinks isOpen={isOpen} />
            </NavBarContainer>
        </>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <NavLink id='anav' to={to}
            style={({ isActive }) => {
                return isActive ? { color: "white", background: "#5885E0", padding: '2%', borderRadius: '5px' } : {};
            }}
        
        >
            <Text display="block" {...rest}>
                {children}
            </Text>
        </NavLink>
    );
};

const MenuLinks = ({ isOpen }) => {
    return (
        <Box id='box'
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/">HOME</MenuItem>

                <MenuItem to="/Agenda">AGENDA</MenuItem>




            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px" 
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["#333333", "#333333", "transparent", "transparent"]}
            color={["#5885E0", "#5885E0", "#5885E0", "#5885E0"]}
            {...props}
        >
            {children}
        </Flex>
    );
};

export default NavBar;