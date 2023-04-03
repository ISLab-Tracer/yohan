import React, { useState } from 'react';
import Properties from './Properties';
import { ImgError, ExcelParsing } from 'Utils';
import * as XLSX from 'xlsx';

// 이거 원래 이게 맞나?
import img from 'Assets/img/logo.png';

const UserProfile = () => {
  /* Router */

  /* State */
  const [excel, setExcel] = useState();
  const [excelfield, setExcelfield] = useState();
  const [check, setCheck] = useState(false);

  /* Functions */

  // 엑셀 파싱 함수
  const testChange = (e) => {
    <ExcelParsing
      setField={setExcelfield}
      setRow={setExcel}
      target={e.target}
    />;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      // Sheet 구분
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // jsonData => 엑셀 파싱 값
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
      // 필드값 추출
      const fieldheader = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcel(jsonData);
      setExcelfield(fieldheader[0]);
      setCheck(true);
    };
    reader.readAsBinaryString(file);
  };

  /* Hooks */
  /* Render */
  return (
    <div className="main-content-container">
      <div className="profile-page-main">
        <Properties.Header fieldTitle="유저 설정" name="결제 및 설정" />
        {/* 유저 정보 */}
        <Properties.Box fieldTitle="유저 정보" style={{ marginTop: '0' }}>
          <div className="profile-page-main-mainbox flexrow">
            <div className="profile-page-main-mainbox-leftbox">
              <Properties.Input fieldTitle="이름" name="이름" />
              <Properties.Input fieldTitle="언어" name="언어" />
              <div className="field-container">
                <h5>로그인 방식</h5>
                <div className="property-field">
                  <div>
                    <img src={img} alt="img" />
                  </div>
                  <div>
                    <span>ISLAB</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-page-main-mainbox-rightbox">
              <input type="file" accept="image/*" style={{ display: 'none' }} />
              <img
                src=""
                alt="img"
                className="profile-page-main-mainbox-rightbox-img"
                onError={ImgError}
              />
            </div>
          </div>
          <Properties.Button fieldTitle="저장" />
        </Properties.Box>

        <Properties.Box fieldTitle="테스트" name="테스트">
          {/* 엑셀 파싱 */}
          <div>
            <input type="file" accept=".xlsx,.xls" onChange={testChange} />
          </div>
          <div>
            <div className="flexrow">
              {check &&
                excelfield.map((field, index1) => {
                  // 필드명 추출 ( 최적화 필요 )
                  return <div key={index1}>{field}</div>;
                })}
            </div>
            {check &&
              excel.map((row, index1) => {
                // 각행 추출
                return (
                  <div key={index1} className="flexrow">
                    {excelfield.map((field, index2) => {
                      // 하나의 행에서 Field값 추출
                      return (
                        <div key={index2} className="flex">
                          <div className="">{row[field]}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </Properties.Box>
        {/* 이메일 알림 */}
      </div>
    </div>
  );
};

export default UserProfile;
