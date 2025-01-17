//
//  ContentView.swift
//  lab1-CS148
//
//  Created by Daniel Hwang on 1/16/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.black)
            Text("Hello, world!")
                .foregroundStyle(.black)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
