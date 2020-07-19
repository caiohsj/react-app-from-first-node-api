import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    prevPage = () => {
        const { pages } = this.state.productInfo;
        if (pages == 1)
            return;

        const pageNumber = this.state.page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { pages } = this.state.productInfo;
        if (pages == this.state.page)
            return;

        const pageNumber = this.state.page + 1;
        this.loadProducts(pageNumber);
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;
        this.setState({
            products: docs,
            productInfo,
            page
        });
    }

    render() {
        return (
            <div className="product-list">
                {this.state.products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <a onClick={this.prevPage}>Anterior</a>
                    <a onClick={this.nextPage}>Próxima</a>
                </div>
            </div>
        )
    }
}