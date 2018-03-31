/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.mrdaisite.android.data.model;

/**
 * Created by dai on 2018/3/30.
 */
public class Token {

    /**
     * token_type : Bearer
     * expires_in : 31536000
     * access_token : eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ3YTQ4ZDc5MGRlNjEyMzJkNWI0ZWVjMjc4ZDhjZGMzMzY3MGIxNmY5NDY2YjM3MTg4ZmYyMDBlOGI4ODQyM2E2MTE4OTIxYjE3M2M0M2ZlIn0.eyJhdWQiOiIxIiwianRpIjoiNDdhNDhkNzkwZGU2MTIzMmQ1YjRlZWMyNzhkOGNkYzMzNjcwYjE2Zjk0NjZiMzcxODhmZjIwMGU4Yjg4NDIzYTYxMTg5MjFiMTczYzQzZmUiLCJpYXQiOjE1MjIzODg4NjMsIm5iZiI6MTUyMjM4ODg2MywiZXhwIjoxNTUzOTI0ODYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.QaLYLfohFFvelx6NLj1_5vgb0Pwz3G62WfjutuGHmOxLPSjQlj0yqBM2anxUeh4-3A-58getEHJMXEaAfbc83QdueFst7eFgO3IxlfNnJGE9wFLsKQpqkMno-uVP2OZ_iYCY8k9nl0IGGnDAO5bd3IKURV3vygwOplRUmpWS1xE_Bu94jC5874MdShbyajXoVPOk5KJ9AS3UcmQ1cJA_gGD-06nbxtj9QyqoOMNxD_Oa5r9gzUPhrZCXb8UpgxlneK3z_jEMAProFT4GGR2hRtinMtYHi0tRFrf8NxNDyUhffY6qQDWJf0Z1Qs96ylvzLR8itKniO0_Cly4TSIXpr-jHygaXbq40Q-V-AUIF7gTnTtpse1UK_ytjDZnsrwaJJYcGjOeHTZf5E3XyejMwI9pTnwVmYWQ20HNCDKNdkuhwqIWWx-SfqTYpxXym1N3Mnb3qr-U8hCciMhYmiDYyPZACjz8eMAQzMaHvrVejgWy74N8A3SDrUW2MulduPI_c_htvt9T2iPgwCgl-QMvMFmu_S1daE5SaM5Zd_U_A_ELNV6ShJ5UDCcLA4NWtLdOmDXe1Cs0d0QGP_Et54lr82DKwt4wHahTgFoLBIOh6YsBbBfpIfjMKBGKbyrWMKC14UrPXyURcf121x_cYVf992ZcbKHJtzMqtiwG4x54LV0U
     * refresh_token : def50200baae3ac33f0147751afdb678b92188f168069be5f65faa7e9e10d75dcbe9c1d5b340dffa02b959908525e027d873eb174afebfc55c0ec83a7f5f3b1c80d01cf7ba5470a72dcfa3859bdcd7d53c2053c322424f1b54222e307d6b141f2841be07fe3838a1dd073419e6076c5d702fb85edbadf20e31fdaffdc0c63159ccaadd2d776fdce862776523c7922fbba40fe5d7ed5ee4be624262430c0275f929ffe423d72013075514b9474c57f405d23560e5012c7124462cc3714f9ca976a663cccf894a0627a84185b2f980d0c387b45a27530e3176500b702fd0581f01b3247b6dbf8f754d2e3a5b3d5815196237e14200c205dcd842b92c1d8795ca02b946c2cdf87cd48baae97f807a91149e3ea398fc1487fd050ddf5374ad317ca13185fe48083ef7495b467b33af25cc1274bbc07414ede08ce90be7b3bd1a473ecdc47c4bd858ff0774a9d9088228cbc26d6cbd3fb0f917d1c1da1a03259cdaf715
     */

    private String token_type;
    private int expires_in;
    private String access_token;
    private String refresh_token;

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }
}
