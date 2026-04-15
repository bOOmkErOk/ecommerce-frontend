import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private graphqlUrl = 'https://localhost:7236/graphql';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
        query {
          products {
            id
            title
            price
            description
            category
            stock
            averageRating
            imageUrl
            totalSold
          }
        }
      `,
      })
      .pipe(map((response) => response.data.products));
  }

  getSponsoredProduct(): Observable<Product> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        sponsoredProduct {
          id
          title
          price
          imageUrl
          sponsoredUntil
        }
      }
    `,
      })
      .pipe(map((response) => response.data.sponsoredProduct));
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
        query {
          productById(id: ${id}) {
            id
            title
            price
            description
            category
            stock
            averageRating
            imageUrl
            totalSold
          }
        }
      `,
      })
      .pipe(map((response) => response.data.productById));
  }

  getSaleProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        saleProducts {
          id
          title
          price
          discountPercent
          averageRating
          stock
          imageUrl
          totalSold
        }
      }
    `,
      })
      .pipe(map((response) => response.data.saleProducts));
  }
  getBestSellingProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        bestSellingProducts {
          id
          title
          price
          discountPercent
          averageRating
          imageUrl
          stock
          totalSold
        }
      }
    `,
      })
      .pipe(map((response) => response.data.bestSellingProducts));
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        allProducts {
          id
          title
          price
          discountPercent
          averageRating
          imageUrl
          stock
          totalSold
        }
      }
    `,
      })
      .pipe(map((response) => response.data.allProducts));
  }

  getAllSaleProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        allSaleProducts {
          id
          title
          price
          discountPercent
          averageRating
          imageUrl
          stock
          totalSold
        }
      }
    `,
      })
      .pipe(map((response) => response.data.allSaleProducts));
  }

  getAllBestSellingProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        allBestSellingProducts {
          id
          title
          price
          discountPercent
          averageRating
          imageUrl
          stock
          totalSold
        }
      }
    `,
      })
      .pipe(map((response) => response.data.allBestSellingProducts));
  }

  
getProductsByCategory(categoryName: string): Observable<Product[]> {
  if (!categoryName) return of([]);

  const enumMapping: { [key: string]: string } = {
    'phones': 'Phones',
    'computers': 'Computers',
    'smartwatch': 'SmartWatch',
    'camera': 'Camera',
    'headphones': 'HeadPhones',
    'gaming': 'Gaming',
    'woman-fashion': 'WomansFashion',
    'men-fashion': 'MensFashion',
    'electronics': 'Electronics',
    'home-lifestyle': 'HomeLifestyle',
    'medicine': 'Medicine',
    'sports-outdoor': 'SportsOutdoor',
    'baby-toys': 'BabyToys',
    'groceries-pets': 'GroceriesPets',
    'health-beauty': 'HealthBeauty'
  };

  const finalCat = enumMapping[categoryName.toLowerCase()] || categoryName;

  const query = `
  query($cat: String!) { 
    productsByCategory(category: $cat) {
      nodes {
        id
        title
        price
        imageUrl
        discountPercent
        averageRating
        stock
      }
    }
  }
`;

return this.http.post<any>(this.graphqlUrl, {
  query: query,
  variables: { 
    cat: finalCat 
  }
}).pipe(
  map(response => {
    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      return [];
    }
    return response.data?.productsByCategory?.nodes || [];
  })
);
}

  getNewArrivalProducts(): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        newArrivalProducts {
          id
          title
          price
          description
          imageUrl
          discountPercent
        }
      }
    `,
      })
      .pipe(map((response) => response.data.newArrivalProducts));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query SearchProducts($query: String!) {
        searchProducts(query: $query) {
          id
          title
          price
          imageUrl
          discountPercent
          averageRating
          stock
          totalSold
        }
      }
    `,
        variables: { query },
      })
      .pipe(map((response) => response.data.searchProducts));
  }

  hasUserBoughtProduct(productId: number): Observable<boolean> {
    return this.http
      .post<any>(this.graphqlUrl, {
        query: `
      query {
        hasUserBoughtProduct(productId: ${productId})
      }
    `,
      })
      .pipe(map((response) => response.data.hasUserBoughtProduct));
  }

  rateProduct(productId: number, rating: number): Observable<any> {
    return this.http.post('https://localhost:7236/api/ratings/rate-product', {
      productId,
      rating,
    });
  }
}
