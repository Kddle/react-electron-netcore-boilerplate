using ElectronCgi.DotNet;
using System;

namespace Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();

            // <string, string> = <T, T> = <InputDataType, OutputDataType>
            connection.On<string, string>("greeting", x => x + " World ! (from Core)");
            connection.Listen();
        }
    }
}
