import React from "react";
import ProductsPageFooter from "../../components/ProductsPageFooter";
import PageLayout from "../../layouts/PageLayout";
import { IProductsConfigMap } from "../../models/common";
import IllustrationViewer from "../IllustrationViewer";
import Layout from "./Layout";
import Product from "./Product/Product";
import { IProductWithIllustrations } from "./types";

interface IProps {
  products: IProductWithIllustrations[];
  productsConfig: IProductsConfigMap;
  getProducts: () => void;
  getIllustrations: () => void;
  onProductClick: (productGuid: number) => void;
  onAdequacyClick: () => void;
  activeProductGuid?: number;
  clearActiveProduct: () => void;
  isIllustrationPreviewed: boolean;
  getCoversConfig: () => void;
  getProductsConfig: () => void;
  getFundRiskProfilesConfig: () => void;
  isNeedsAnalysisDone?: boolean;
}

class Products extends React.Component<IProps> {
  public componentDidMount = () => {
    this.props.getProducts();
    this.props.getIllustrations();
    this.props.getProductsConfig();
    this.props.getCoversConfig();
    this.props.getFundRiskProfilesConfig();
  };

  public componentWillUnmount = () => {
    this.props.clearActiveProduct();
  };

  private handleProductClick = (productGuid: number) => () =>
    this.props.onProductClick(productGuid);

  get isProductActive() {
    return this.props.activeProductGuid !== undefined;
  }

  public render() {
    const getProductCategories = (productGuid: number) =>
      this.props.productsConfig[productGuid]
        ? this.props.productsConfig[productGuid].product_categories
        : [];
    return this.props.isIllustrationPreviewed ? (
      <IllustrationViewer />
    ) : (
      <PageLayout
        footer={
          <ProductsPageFooter
            prevButtonVisible={false}
            footerBlockerVisible={this.isProductActive} // we need to block footer separately because of bug on iPad - fixed positioned div which should cover whole page, covers only scrollable container
            onFooterBlockerClick={this.props.clearActiveProduct}
            isNeedsAnalysisDone={this.props.isNeedsAnalysisDone}
          />
        }
        pageName="productsPrudential.title"
      >
        <Layout
          showBackdrop={this.isProductActive}
          onClick={this.props.clearActiveProduct}
        >
          <div id="products-container">
            {this.props.products.map((product, idx) => (
              <Product
                key={product.product_guid}
                product={product}
                productCategories={getProductCategories(product.product_guid)}
                onProductClick={this.handleProductClick(product.product_guid)}
                onAdequacyClick={this.props.onAdequacyClick}
                isActive={product.product_guid === this.props.activeProductGuid}
                isInLastProduct={idx === this.props.products.length - 1}
              />
            ))}
          </div>
        </Layout>
      </PageLayout>
    );
  }
}

export default Products;
