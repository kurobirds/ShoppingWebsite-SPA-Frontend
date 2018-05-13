import React, { Component } from "react";
import Main from "../routes/routes";
import Navigation from "../components/Navigation";
import { Layout, Icon } from "antd";
const { Header, Content, Footer } = Layout;

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			siderColor: null,
		};
	}

	componentDidMount() {
		this.props.fetchData("https://demo-ggpsgdyfcj.now.sh/categories");
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<Layout>
				<Navigation
					collapsed={this.state.collapsed}
					toggle={this.toggle}
				/>
				<Layout>
					<Header style={{ background: "#fff", padding: 0 }}>
						<Icon
							className="trigger"
							type={
								this.state.collapsed
									? "menu-unfold"
									: "menu-fold"
							}
							onClick={this.toggle}
						/>
					</Header>
					<Content>
						<Main />
					</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		);
	}
}
