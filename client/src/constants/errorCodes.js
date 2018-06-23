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

// 全局错误状态码
const ERROR_CODES = {
    400000: '参数缺失',
    400001: '参数字符过短',
    400002: '参数字符过长',
    400003: '请求参数存在非法字符',
    400004: '请求参数格式错误',
    400005: '请求参数不存在于数据库',
    400006: '请求参数已存在于数据库',
    401000: '密码错误',
    401001: '无效的的access_token',
    401002: '无效的的refresh_token',
    403000: '权限不足',
    403001: '提取码不正确',
    409000: '上传的资源已存在于服务器',
    409001: '请求的资源不存在',
    409002: '此用户的存储容量不足',
    500000: '服务器错误',
    500001: '服务器资源保存失败',
    504000: '资源下载链接失效',
};

export default ERROR_CODES;
