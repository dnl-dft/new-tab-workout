export default {
    getDateAsString(moveDate) {

        let today = new Date();

        today.setDate(today.getDate() + (moveDate ? moveDate : 0));

        let mm = today.getMonth() + 1;
        let dd = today.getDate();
      
        return [today.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('');
      },
    sortByTask( a, b ) {
        if ( a.task < b.task ){
          return -1;
        }
        if ( a.task > b.task ){
          return 1;
        }
        return 0;
      },
      getDayName(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });        
      },
      getMonthName(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short' });        
      },
}