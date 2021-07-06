import React, { FunctionComponent, useState, useCallback } from "react";
import styled from "styled-components";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";
import { Button, TextField } from "@material-ui/core";

interface Props {
	token: string;
}

const PlaidLink: FunctionComponent<Props> = ({ token }) => {
	const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
		// send public_token to server
	}, []);

	const config: PlaidLinkOptions = {
		token,
		onSuccess,
		// onExit
		// onEvent
	};

	const { open, ready, error } = usePlaidLink(config);

	console.log(error, open, ready);

	return (
		<Button variant="contained" color="primary" onClick={() => open()} disabled={!ready}>
			Conectar
		</Button>
	);
};

const App: FunctionComponent = () => {
	const [auxToken, setAuxToken] = useState<string>("");
	const [token, setToken] = useState<string | null>(null);

	const handleSubmit = () => setToken(auxToken);

	const handleClean = () => {
		setToken(null);
		setAuxToken("");
	};

	return (
		<div className="App">
			<Container>
				<Text>Ingresar Token</Text>
				<TextField value={auxToken} onChange={(e) => setAuxToken(e.target.value)} />
				<Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
					Enviar
				</Button>
				<Button variant="outlined" color="primary" fullWidth onClick={handleClean}>
					Limpiar
				</Button>
				{token === null ? <></> : <PlaidLink token={token} />}
			</Container>
		</div>
	);
};

export default App;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 2rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Text = styled.h1`
	font-size: 2rem;
`;
