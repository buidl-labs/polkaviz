import React from "react";
import ReactDOM from "react-dom";
import {
	ThemeProvider,
	ColorModeProvider,
	CSSReset,
	theme
} from "@chakra-ui/core";
import "./stylesheets/index.scss";
import App from "./components/App.jsx";

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<ColorModeProvider>
			<CSSReset />
			<App />
		</ColorModeProvider>
	</ThemeProvider>,
	document.getElementById("root")
);
