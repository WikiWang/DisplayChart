package cn.edu.buaa.cngrid.servlet;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetEnviromentUsers extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4055301167961824695L;

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String url = "../webapps/DisplayChart/data/"+request.getParameter("file");
		File file = new File(url);
		String content = "";
		try {
			BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream(file),"UTF-8"));
			String line=null;
			while((line=(bf.readLine()).trim())!=null){
				content = content + line;
			}
		} catch (Exception e) {
		}
		String name = request.getParameter("file");
		System.out.println(name + content);
		response.getWriter().print(content);		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
