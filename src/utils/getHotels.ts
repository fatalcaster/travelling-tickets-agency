const start = async () => {
  //   const headers = new Headers();
  //   headers.append(
  //     "Cookie",
  //     `_pxhd=s%2FMOFvZUZlDOKtDPIUJHkE8Cn7i225lXN0A%2F9IpwtJbPlY9JDULhYXZn0wTaBHUiRAWi34lqg7-OQVUd8-L9pg%3D%3D%3AJ5b3ZL7KGDwKicDDgZ4dVCEvPNsxSSZGcMny6Ks0efHd5pyfNfW81Ccme1wYw%2F9nqFqzUBeJGYOdyv6p%2FIvCtnzisFgmjvaU1f0vQtrEiNs%3D; bkng=11UmFuZG9tSVYkc2RlIyh9YXSgTtYpR%2F1WOjMvuuinviG7iXvPF7cNTqw0JmDuYS9r%2FZ7RvLpnxox8zHcMZJtSKzyyyU7WGopeTLtXsyUTRuFdzdwECzVWtOAKuxr9ZONC278cBuKfg2iE0kaVMpahmRKGV8dh4YFddAlN689z6eYQEDiqxESOa%2FvdRkZbFP0eUlIoFZguXYEHov2lFSj5SQ%3D%3D; cors_js=1; _ga=GA1.1.1325559191.1688915560; bkng_sso_ses…470c93f:UWOiI5JX8YLC8M7ORRVw3ZH7AOwBBZsoxiUBAgQQzDOKm6vGawI7JpYmEktBnR9y5nl4U4P5fQeZhc8hdncxdA==:1000:HZj4vSzywjs7uVei42M1tojuDKUKYxbLED6oU/Qyc9ftghKIcKF7kSnHgXu04YFjtGxTay/lxbemOPwdNCO6ZLQ0DsEl8JZxImQDpOdGG2zoacDyrs4v3OrbeCuB1kgY65fULEOFlwyMOfkm83Pyi6puOzafUiEp+yffFRPfWSnO6KUlttxZPtS23FBVNaciG8U3HliUZz3iXR2gfu7ByQ==; lastSeen=0; g_state={"i_p":1694614509304,"i_l":1}; _scid_r=a5a7430c-cc85-41d9-bac5-d936abfe3057; _pxff_tm=1; _uetsid=2c67a2b0522f11ee957c335d5a3d76b8; _uetvid=075ced70e11111edaf3b3f956556c579`
  //   );

  //   const response = await fetch(
  //     `https://www.booking.com/dml/graphql?s=Kopaonik%2C+Srbija&efdco=1&label=gen173nr-1BCAEoggI46AdIM1gEaMEBiAEBmAEkuAEYyAEP2AEB6AEBiAIBqAIEuALGz4aoBsACAdICJDg1MzljZmVjLTliMzMtNDAwZS1hM2UzLTU4OWZlNzczNTRjYtgCBeACAQ&sid=482305d3a29121c396d05036a2f95c4f&aid=304142&lang=sr&sb=1&src_elem=sb&src=index&dest_id=900049427&dest_type=city&checkin=2023-09-15&checkout=2023-09-30&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure`,
  //     { method: "POST", headers: headers }
  //   );
  //   const json = await response.json();
  //   console.log(response);
  //   console.log("TEst", json);

  const response = await fetch(
    "https://www.booking.com/searchresults.sr.html?label=gen173nr-1BCAEoggI46AdIM1gEaMEBiAEBmAEkuAEYyAEP2AEB6AEBiAIBqAIEuALGz4aoBsACAdICJDg1MzljZmVjLTliMzMtNDAwZS1hM2UzLTU4OWZlNzczNTRjYtgCBeACAQ&sid=482305d3a29121c396d05036a2f95c4f&aid=304142&ss=Kopaonik%2C+Srbija&efdco=1&lang=sr&sb=1&src_elem=sb&dest_id=900049427&dest_type=city&checkin=2023-09-15&checkout=2023-09-30&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure&order=price"
  );
  console.log(response);
};

start();
