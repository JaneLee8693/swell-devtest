import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import WebFont from 'webfontloader';
import Header from './components/header/header';
import ReviewsList from './components/reviews-list/ReviewsList';
import { theme } from './theme';


WebFont.load({
	google: {
		families: ['Montserrat:500,600,700'],
	},
});

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Container sx={{ mt: 2, typography: 'body1' }}>
				<ReviewsList/>
			</Container>
		</ThemeProvider>
	);
}

export default App;
