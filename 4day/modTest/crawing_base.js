// 모듈 가져오기
var webDrive = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
// 브라우저 설정
var driver = new webDrive.Builder().forBrowser("chrome").build();

// 접속
var url = "http://tour.interpark.com/";
driver.get(url).then(pageload);
// html이 로드되면 (페이지 요청 후 대략 1~2,3초 대기 시간이 필요할 수 있다.)
// 파싱코드(데이터를 추출 등)를 즉각적으로 수행하면 오류발생 가능성이 큼
// 검색창을 찾아서 검색어를 넣는다 ( SearchGNBText )
// 1초후 동작
// driver.wait(function(){
    
//     return;
// }, 1000 * 1);

function pageload() {
    
    var searchInputEle = driver.findElement( webDrive.By.id("SearchGNBText") );
    // input창에 값을 넣는 함수
    searchInputEle.sendKeys("파리");
    // 검색 버튼을 찾아서 클릭
    driver.findElement( webDrive.By.id("scbt") ).click().then(_=>{
        // 더보기 : 해외여행 섹션 : id : divSearchResultR
        // var divSearchResultR = driver.findElement( webDrive.By.id("divSearchResultR") );
        // console.log( "divSearchResultR", divSearchResultR );
        setTimeout(_=>{
                // var divSearchResultR = driver.findElement( webDrive.By.id("divSearchResultR") );
                // var p = divSearchResultR.findElement( webDrive.By.tagName("p") );
                // var a = p.findElement( webDrive.By.tagName("a"));
                // a.click();
                driver.findElement( webDrive.By.css('#divSearchResultR>p>a') ).click().then(_=>{
                    setTimeout(_=>{

                    }, 1000*2);
                });
        }, 1000*3);
    });
}
// 브라우저 닫기
// driver.quit();