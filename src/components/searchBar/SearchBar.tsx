import styles from './SearchBar.module.css';
import HarryPotterImg from './harry_potter.png';
import { Component } from 'react';

export class SearchBar extends Component {
  render() {
    return (
      <div className={styles.searhWrapper}>
        <img src={HarryPotterImg} alt="Harry Potter image" />
        <form>
          <input type="text" />
          <button>Search</button>
        </form>
      </div>
    );
  }
}
